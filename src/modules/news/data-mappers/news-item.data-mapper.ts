import { Injectable } from '@nestjs/common'

import {
  INewsToCreateView,
  INewsToItemByUuidView,
  INewsToListView,
  INewsTranslationItem,
} from 'src/modules/news/interfaces/news'

import { NewsItemEntity } from 'src/modules/news/entities/news-item.entity'
import { NewsItemTranslationEntity } from 'src/modules/news/entities/news-translation.entity'

import { CategoryDataMapper } from 'src/modules/categories/data-mappers/categories.data-mapper'

@Injectable()
export class NewsDataMapper {
  constructor(private categoriesDataMapper: CategoryDataMapper) {}

  private mapTranslations(translations: NewsItemTranslationEntity[]): INewsTranslationItem[] {
    return translations.map((translation) => ({
      language: translation.language_slug,
      title: translation.title,
      description: translation.description,
    }))
  }

  newsToCreateView(entity: NewsItemEntity): INewsToCreateView {
    const {
      id,
      translations,
      news_category: newsCategoryItem,
      is_published: isPublished,
      published_date: datePublished,
      created_at: dateCreated,
    } = entity

    let category = null
    const translatedTitles = this.mapTranslations(translations)
    if (newsCategoryItem) {
      category = this.categoriesDataMapper.categoryToGeByUuidView(newsCategoryItem)
    }

    return {
      uuid: id,
      isPublished,
      translations: translatedTitles,
      newsCategory: category,
      datePublished,
      dateCreated,
    }
  }

  newsToListView(entity: NewsItemEntity): INewsToListView {
    const {
      id,
      translations,
      news_category: newsCategoryItem,
      is_published: isPublished,
      published_date: datePublished,
      created_at: dateCreated,
    } = entity

    let category = null
    const translatedTitles = this.mapTranslations(translations)
    if (newsCategoryItem) {
      category = this.categoriesDataMapper.categoryToGeByUuidView(newsCategoryItem)
    }

    return { uuid: id, isPublished, newsCategory: category, translations: translatedTitles, datePublished, dateCreated }
  }

  newsToGetByUuidView(entity: NewsItemEntity): INewsToItemByUuidView {
    const {
      id,
      translations,
      news_category: newsCategoryItem,
      is_published: isPublished,
      published_date: datePublished,
      created_at: dateCreated,
    } = entity
    let category = null
    const translatedTitles = this.mapTranslations(translations)
    if (newsCategoryItem) {
      category = this.categoriesDataMapper.categoryToGeByUuidView(newsCategoryItem)
    }

    return { uuid: id, isPublished, newsCategory: category, translations: translatedTitles, datePublished, dateCreated }
  }
}
