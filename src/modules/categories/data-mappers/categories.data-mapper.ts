import { Injectable } from '@nestjs/common'

import { ICategory, ICategoryTranslation } from 'src/modules/categories/interfaces/categories'

import { CategoryTranslationEntity } from 'src/modules/categories/entities/category-translation.entity'
import { CategoryEntity } from 'src/modules/categories/entities/category.entity'

@Injectable()
export class CategoryDataMapper {
  private mapTranslations(translations: CategoryTranslationEntity[]): ICategoryTranslation[] {
    return translations.map((translation) => ({
      language: translation.language_slug,
      title: translation.title,
    }))
  }

  categoryToCreateView(entity: CategoryEntity): ICategory {
    const { id, translations } = entity
    const translatedCategories = this.mapTranslations(translations)

    return { uuid: id, categoryTranslations: translatedCategories }
  }

  categoryToGeByUuidView(entity: CategoryEntity): ICategory {
    const translations = this.mapTranslations(entity.translations)

    return { uuid: entity.id, categoryTranslations: translations }
  }
}
