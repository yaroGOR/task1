import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { INewsToCreateView, INewsToItemByUuidView, INewsToListView } from 'src/modules/main/interfaces/news'

import { CreateNewsItemRequestDto } from 'src/modules/main/dto/requests/create-news-request.dto'

import { NewsItemEntity } from 'src/modules/main/entities/news-item.entity'
import { NewsItemTranslationEntity } from 'src/modules/main/entities/news-translation.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news-item.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    private readonly newsDataMapper: NewsDataMapper,
    @InjectRepository(NewsItemEntity) private newsRepository: Repository<NewsItemEntity>,
    @InjectRepository(NewsItemTranslationEntity) private translationRepository: Repository<NewsItemTranslationEntity>,
  ) {}

  async createOne(createNewsItemDto: CreateNewsItemRequestDto): Promise<{ data: INewsToCreateView }> {
    const { isPublished, translations } = createNewsItemDto

    const newsItem = this.newsRepository.create({ is_published: isPublished })
    const savedNewsItem = await this.newsRepository.save(newsItem)

    const savedTranslations = []
    for (const translation of translations) {
      const { title, description, languageSlug } = translation

      const newsTranslation = this.translationRepository.create({
        title,
        description,
        language_slug: languageSlug,
        news_item: savedNewsItem,
      })

      savedTranslations.push(this.translationRepository.save(newsTranslation))
    }

    await Promise.all(savedTranslations)

    const newsItemWithTranslations = await this.newsRepository.findOneOrFail({ where: { id: savedNewsItem.id } })

    return { data: this.newsDataMapper.newsToCreateView(newsItemWithTranslations) }
  }

  async getList(): Promise<{ data: INewsToListView[] }> {
    const newsList = await this.newsRepository.find({ where: { is_published: true } })

    return { data: newsList.map((newsItem) => this.newsDataMapper.newsToListView(newsItem)) }
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
