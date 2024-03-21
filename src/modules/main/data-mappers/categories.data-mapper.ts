import { Injectable } from '@nestjs/common'

import { PaginatedResponseDto } from 'src/core/dto/pagination-response.dto'

import { ICategory, ICategoryTranslation } from 'src/modules/main/interfaces/categories'

import { CategoryTranslationEntity } from 'src/modules/main/entities/category-translation.entity'
import { CategoryEntity } from 'src/modules/main/entities/category.entity'

@Injectable()
export class CategoryDataMapper {
  private mapTranslations(translations: CategoryTranslationEntity[]): ICategoryTranslation[] {
    return translations.map((translation) => ({
      lang: translation.language_slug,
      title: translation.title,
    }))
  }

  categoryToCreateView(entity: CategoryEntity): ICategory {
    const {
      id,
      translations,
      slug,
      is_published: isPublished,
      published_date: publishedAt,
      created_at: createdAt,
      updated_at: updatedAt,
    } = entity
    const translatedCategories = this.mapTranslations(translations)

    return {
      id,
      slug,
      isPublished,
      publishedAt,
      title: translatedCategories[0].title,
      translationList: translatedCategories,
      createdAt,
      updatedAt,
    }
  }

  categoryToGeByUuidView(entity: CategoryEntity): ICategory {
    const {
      id,
      translations,
      slug,
      is_published: isPublished,
      published_date: publishedAt,
      created_at: createdAt,
      updated_at: updatedAt,
    } = entity
    const translatedCategories = this.mapTranslations(translations)

    return {
      id,
      slug,
      isPublished,
      publishedAt,
      title: translatedCategories[0].title,
      translationList: translatedCategories,
      createdAt,
      updatedAt,
    }
  }

  categoryToListView(entity: CategoryEntity): ICategory {
    const {
      id,
      translations,
      slug,
      is_published: isPublished,
      published_date: publishedAt,
      created_at: createdAt,
      updated_at: updatedAt,
    } = entity
    const translatedCategories = this.mapTranslations(translations)

    return {
      id,
      slug,
      isPublished,
      publishedAt,
      title: translatedCategories[0].title,
      translationList: translatedCategories,
      createdAt,
      updatedAt,
    }
  }

  categoriesToPaginatedView(entities: CategoryEntity[], page, total, limit = 10): PaginatedResponseDto<ICategory> {
    const categoriesList = entities.map((categoryItem) => this.categoryToListView(categoryItem))

    return new PaginatedResponseDto(categoriesList, page, limit, total)
  }
}
