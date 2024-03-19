import { LanguageSlugEnum } from 'src/modules/news/enums/language.enum'

export interface ICategoryTranslation {
  title: string
  language: LanguageSlugEnum
}

export interface ICategory {
  uuid: string
  categoryTranslations: ICategoryTranslation[]
}
