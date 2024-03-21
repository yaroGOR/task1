import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import {
  NEWS_CATEGORY_QUERY_PARAM,
  PUBLISHED_AFTER_QUERY_PARAM,
  PUBLISHED_BEFORE_QUERY_PARAM,
  SEARCH_TERM_QUERY_PARAM,
  SORT_COLUMN_QUERY_PARAM,
  SORT_DIRECTION_QUERY_PARAM,
} from 'src/modules/main/constants/query-params.constants'
import { SortColumnEnum } from 'src/modules/main/enums/sort-column.enum'
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository, UpdateResult } from 'typeorm'

import { PaginationQueryParamsDto } from 'src/core/dto/pagination-query-params.dto'
import { PaginatedResponseDto } from 'src/core/dto/pagination-response.dto'

import { INews } from 'src/modules/main/interfaces/news'

import { SearchNewsQueryParams } from 'src/modules/main/dto/queries/search-news-query-params.dto'
import { SortQueryParams } from 'src/modules/main/dto/queries/sort-category-query-params.dto'
import { CreateNewsRequestDto } from 'src/modules/main/dto/requests/create-news-request.dto'
import { UpdateNewsDtoRequest } from 'src/modules/main/dto/requests/update-news-request.dto'

import { CategoryEntity } from 'src/modules/main/entities/category.entity'
import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    private readonly newsDataMapper: NewsDataMapper,
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
    @InjectRepository(NewsTranslationEntity) private translationRepository: Repository<NewsTranslationEntity>,
    @InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  private async createSearchQuery(searchQueryParams: SearchNewsQueryParams): Promise<unknown> {
    const searchTermQuery = searchQueryParams[SEARCH_TERM_QUERY_PARAM]
    const publishedAfterQuery = searchQueryParams[PUBLISHED_AFTER_QUERY_PARAM]
    const publishedBeforeQuery = searchQueryParams[PUBLISHED_BEFORE_QUERY_PARAM]
    const categoryQuery = searchQueryParams[NEWS_CATEGORY_QUERY_PARAM]
    const query = {
      translations: [],
      news_category: undefined,
      published_date: undefined,
    }

    if (searchTermQuery) {
      query.translations.push({
        _or: [{ description: ILike(`%${searchTermQuery}%`) }, { title: ILike(`%${searchTermQuery}%`) }],
      })
    }

    if (publishedAfterQuery) {
      const publishedAfterDate = moment(publishedAfterQuery).toISOString()

      query.published_date = MoreThanOrEqual(publishedAfterDate)
    }

    if (publishedBeforeQuery) {
      const publishedBeforeDate = moment(publishedBeforeQuery).toISOString()

      query.published_date = LessThanOrEqual(publishedBeforeDate)
    }

    if (categoryQuery) {
      const category = await this.categoriesRepository.findOne({
        where: { id: categoryQuery },
      })

      if (!category) {
        throw new BadRequestException('Category Not Found')
      }

      query.news_category = { id: categoryQuery }
    }

    return query
  }

  async createOne(createNewsDto: CreateNewsRequestDto): Promise<{ data: INews }> {
    let newsWithTranslations
    const { translationList, newsCategory, isPublished, thumbnailUrl, slug } = createNewsDto
    const queryRunner = this.translationRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()

    await queryRunner.startTransaction()

    const news = this.newsRepository.create({
      thumbnail_url: thumbnailUrl,
      is_published: isPublished,
      slug: slug,
    })

    if (newsCategory) {
      const category = await this.categoriesRepository.findOne({ where: { id: newsCategory } })

      news.news_category = category
    }

    const savedNews = await this.newsRepository.save(news)

    try {
      for (const translation of translationList) {
        const { title, description, lang } = translation

        const newsTranslation = this.translationRepository.create({
          title,
          description,
          language_slug: lang,
          news_item: savedNews,
        })

        await queryRunner.manager.save(newsTranslation)
      }

      await queryRunner.commitTransaction()

      newsWithTranslations = await this.newsRepository.findOneOrFail({ where: { id: savedNews.id } })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException()
    }

    return { data: this.newsDataMapper.newsToCreateView(newsWithTranslations) }
  }

  async getMany(
    searchQueryParams: SearchNewsQueryParams,
    paginationQueryParams: PaginationQueryParamsDto,
    sortQueryParams?: SortQueryParams,
  ): Promise<PaginatedResponseDto<INews>> {
    const order: { [key: string]: 'ASC' | 'DESC' } = {}
    let sortColumn
    let sortDirection
    const page = paginationQueryParams.page || 1
    const limit = paginationQueryParams.pageSize || 10
    const skip = (page - 1) * limit
    const query = await this.createSearchQuery(searchQueryParams)

    if (sortQueryParams) {
      sortColumn = sortQueryParams[SORT_COLUMN_QUERY_PARAM] || 'id'
      sortDirection = sortQueryParams[SORT_DIRECTION_QUERY_PARAM] || 'DESC'
    }

    if (sortColumn === 'title') {
      // TODO: implement sorting by title and category name
      throw new BadRequestException('Sorting by title is unavailible now')
    } else if (sortColumn === 'newsCategory') {
      throw new BadRequestException()
    } else {
      order[SortColumnEnum[sortColumn]] = sortDirection
    }

    const [newsList, count] = await this.newsRepository.findAndCount({
      where: query,
      skip,
      take: limit,
      order,
      relations: ['translations', 'news_category'],
    })

    return this.newsDataMapper.newsToPaginatedView(newsList, page, count, limit)
  }

  async getByUuid(uuid: string): Promise<{ data: INews }> {
    const found = await this.newsRepository.findOne({
      where: {
        id: uuid,
      },
    })

    if (found) {
      return { data: this.newsDataMapper.newsToGetByUuidView(found) }
    } else {
      throw new NotFoundException()
    }
  }

  async updateOne(updateNewsDto: UpdateNewsDtoRequest, id: string): Promise<{ data: INews }> {
    const { isPublished, translationList, slug } = updateNewsDto

    const newsItem = await this.newsRepository.findOne({
      where: { id },
      relations: ['translations'],
    })

    if (!newsItem) {
      throw new NotFoundException()
    }

    if (isPublished !== undefined) {
      newsItem.is_published = isPublished
    }

    if (slug !== undefined) {
      newsItem.slug = slug
    }

    if (translationList && translationList.length > 0) {
      for (const translation of translationList) {
        const existingTranslation = newsItem.translations.find((t) => t.language_slug === translation.lang)
        if (existingTranslation) {
          existingTranslation.title = translation.title
          existingTranslation.description = translation.description || existingTranslation.description
        } else {
          const newTranslation = this.translationRepository.create({
            news_item: newsItem,
            language_slug: translation.lang,
            title: translation.title,
            description: translation.description || '',
          })

          newsItem.translations.push(newTranslation)
        }
      }
    }

    const updatedNewsItem = await this.newsRepository.save(newsItem)

    return { data: this.newsDataMapper.newsToGetByUuidView(updatedNewsItem) }
  }

  async deleteOne(uuid: string): Promise<UpdateResult> {
    if (!(await this.newsRepository.findOne({ where: { id: uuid } }))) {
      throw new NotFoundException()
    }

    return await this.newsRepository.softDelete({ id: uuid })
  }
}
