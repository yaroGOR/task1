import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import {
  NEWS_CATEGORY_QUERY_PARAM,
  PUBLISHED_AFTER_QUERY_PARAM,
  PUBLISHED_BEFORE_QUERY_PARAM,
  SEARCH_TERM_QUERY_PARAM,
} from 'src/modules/news/constants/query-params.constants'
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm'

import { INewsToCreateView, INewsToItemByUuidView, INewsToListView } from 'src/modules/news/interfaces/news'

import { SearchNewsQueryParams } from 'src/modules/news/dto/query/search-news-query-params.dto'
import { CreateNewsItemRequestDto } from 'src/modules/news/dto/requests/create-news-request.dto'

import { CategoryEntity } from 'src/modules/categories/entities/category.entity'
import { NewsItemEntity } from 'src/modules/news/entities/news-item.entity'
import { NewsItemTranslationEntity } from 'src/modules/news/entities/news-translation.entity'

import { CategoriesService } from 'src/modules/categories/services/categories.service'

import { NewsDataMapper } from 'src/modules/news/data-mappers/news-item.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    private readonly newsDataMapper: NewsDataMapper,
    private readonly categoriesService: CategoriesService,
    @InjectRepository(NewsItemEntity) private newsRepository: Repository<NewsItemEntity>,
    @InjectRepository(NewsItemTranslationEntity) private translationRepository: Repository<NewsItemTranslationEntity>,
    @InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async createOne(createNewsItemDto: CreateNewsItemRequestDto): Promise<{ data: INewsToCreateView }> {
    const { isPublished, translations, categoryUuid } = createNewsItemDto
    let newsItemWithTranslations
    const newsItem = this.newsRepository.create({ is_published: isPublished })
    if (categoryUuid) {
      const category = await this.categoriesRepository.findOne({ where: { id: categoryUuid } })

      newsItem.news_category = category
    }

    const savedNewsItem = await this.newsRepository.save(newsItem)

    const queryRunner = this.translationRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()

    await queryRunner.startTransaction()

    try {
      for (const translation of translations) {
        const { title, description, languageSlug } = translation

        const newsTranslation = this.translationRepository.create({
          title,
          description,
          language_slug: languageSlug,
          news_item: savedNewsItem,
        })

        await queryRunner.manager.save(newsTranslation)
      }

      await queryRunner.commitTransaction()

      newsItemWithTranslations = await this.newsRepository.findOneOrFail({ where: { id: savedNewsItem.id } })
    } catch (error) {
      await queryRunner.rollbackTransaction()
    }

    return { data: this.newsDataMapper.newsToCreateView(newsItemWithTranslations) }
  }

  async getList(searchQueryParams: SearchNewsQueryParams): Promise<{ data: INewsToListView[] }> {
    const query = await this.createSearchQuery(searchQueryParams)

    const newsList = await this.newsRepository.find({
      relations: ['translations', 'news_category'],
      where: query,
      order: {
        created_at: 'DESC',
      },
    })

    return { data: newsList.map((newsItem) => this.newsDataMapper.newsToListView(newsItem)) }
  }

  private async createSearchQuery(searchQueryParams: SearchNewsQueryParams): Promise<unknown> {
    const searchTermQuery = searchQueryParams[SEARCH_TERM_QUERY_PARAM]
    const publishedAfterQuery = searchQueryParams[PUBLISHED_AFTER_QUERY_PARAM]
    const publishedBeforeQuery = searchQueryParams[PUBLISHED_BEFORE_QUERY_PARAM]
    const categoryQuery = searchQueryParams[NEWS_CATEGORY_QUERY_PARAM]
    const query = {
      is_published: true,
      translations: [],
      news_category: undefined,
      published_date: undefined,
    }

    if (searchTermQuery) {
      query.translations.push({ description: ILike(`%${searchTermQuery}%`) })
    }

    if (publishedAfterQuery) {
      const publishedAfterDate = moment.unix(Number(publishedAfterQuery)).toISOString()

      query.published_date = MoreThanOrEqual(publishedAfterDate)
    }

    if (publishedBeforeQuery) {
      const publishedBeforeDate = moment.unix(Number(publishedBeforeQuery)).toISOString()

      query.published_date = LessThanOrEqual(publishedBeforeDate)
    }

    if (categoryQuery) {
      const category = await this.categoriesRepository.findOne({
        where: { translations: [{ title: ILike(`%${categoryQuery}%`) }] },
      })

      if (!category) {
        throw new BadRequestException('Category Not Found')
      }

      query.news_category = { translations: [{ title: ILike(`%${categoryQuery}%`) }] }
    }

    return query
  }

  async getItemByUuid(uuid: string): Promise<{ data: INewsToItemByUuidView }> {
    const foundItem = await this.newsRepository.findOne({
      where: {
        id: uuid,
        is_published: true,
      },
    })

    if (foundItem) {
      return { data: this.newsDataMapper.newsToGetByUuidView(foundItem) }
    } else {
      throw new NotFoundException()
    }
  }
}
