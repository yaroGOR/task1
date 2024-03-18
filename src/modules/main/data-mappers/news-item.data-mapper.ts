import { Injectable } from '@nestjs/common'

import {
  INewsToCreateView,
  INewsToItemByUuidView,
  INewsToListView,
  INewsTranslationItem,
} from 'src/modules/main/interfaces/news'

import { NewsItemEntity } from 'src/modules/main/entities/news-item.entity'
import { NewsItemTranslationEntity } from 'src/modules/main/entities/news-translation.entity'

@Injectable()
export class NewsDataMapper {
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
      is_published: isPublished,
      published_date: datePublished,
      created_at: dateCreated,
    } = entity
    const translatedTitles = this.mapTranslations(translations)

    return { uuid: id, isPublished, translations: translatedTitles, datePublished, dateCreated }
  }

  newsToListView(entity: NewsItemEntity): INewsToListView {
    const {
      id,
      translations,
      is_published: isPublished,
      published_date: datePublished,
      created_at: dateCreated,
    } = entity
    const translatedTitles = this.mapTranslations(translations)

    return { uuid: id, isPublished, translations: translatedTitles, datePublished, dateCreated }
  }

  newsToGetByUuidView(entity: NewsItemEntity): INewsToItemByUuidView {
    const {
      id,
      translations,
      is_published: isPublished,
      published_date: datePublished,
      created_at: dateCreated,
    } = entity
    const translatedTitles = this.mapTranslations(translations)

    return { uuid: id, isPublished, translations: translatedTitles, datePublished, dateCreated }
  }
}
