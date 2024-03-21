import { Injectable } from '@nestjs/common'

import { PaginatedResponseDto } from 'src/core/dto/pagination-response.dto'

import { INews, INewsTranslation } from 'src/modules/main/interfaces/news'

import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { CategoryDataMapper } from 'src/modules/main/data-mappers/categories.data-mapper'

@Injectable()
export class NewsDataMapper {
  constructor(private categoriesDataMapper: CategoryDataMapper) {}

  private mapTranslations(translations: NewsTranslationEntity[]): INewsTranslation[] {
    return translations.map((translation) => ({
      language: translation.language_slug,
      title: translation.title,
      description: translation.description,
    }))
  }

  newsToCreateView(entity: NewsEntity): INews {
    const {
      id,
      slug,
      translations,
      news_category: newsCategory,
      is_published: isPublished,
      published_date: publishedAt,
      created_at: createdAt,
    } = entity

    let category = null
    const translatedTitles = this.mapTranslations(translations)
    if (newsCategory) {
      category = this.categoriesDataMapper.categoryToGeByUuidView(newsCategory)
    }

    return {
      id,
      slug,
      isPublished,
      translations: translatedTitles,
      newsCategory: category,
      publishedAt,
      createdAt,
    }
  }

  newsToListView(entity: NewsEntity): INews {
    const {
      id,
      translations,
      slug,
      news_category: newsCategory,
      is_published: isPublished,
      published_date: publishedAt,
      created_at: createdAt,
    } = entity

    let category = null
    let title = null
    const translatedTitles = this.mapTranslations(translations)
    if (translatedTitles.length > 0) {
      title = translatedTitles[0].title
    }

    if (newsCategory) {
      category = this.categoriesDataMapper.categoryToGeByUuidView(newsCategory)
    }

    return {
      id,
      slug,
      publishedAt,
      isPublished,
      newsCategory: category,
      translations: translatedTitles,
      createdAt,
      title,
    }
  }

  newsToGetByUuidView(entity: NewsEntity): INews {
    const {
      id,
      translations,
      news_category: newsCategory,
      is_published: isPublished,
      published_date: publishedAt,
      created_at: createdAt,
    } = entity
    let category = null
    const translatedTitles = this.mapTranslations(translations)
    if (newsCategory) {
      category = this.categoriesDataMapper.categoryToGeByUuidView(newsCategory)
    }

    return { id, isPublished, newsCategory: category, translations: translatedTitles, publishedAt, createdAt }
  }

  newsToPaginatedView(entities: NewsEntity[], page, total, limit = 10): PaginatedResponseDto<INews> {
    const categoriesList = entities.map((categoryItem) => this.newsToListView(categoryItem))

    return new PaginatedResponseDto(categoriesList, page, limit, total)
  }
}
