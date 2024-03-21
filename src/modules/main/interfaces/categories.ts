import { LanguageSlugEnum } from 'src/modules/main/enums/language.enum'

export interface ICategoryTranslation {
  title: string
  lang: LanguageSlugEnum
}

export interface ICategory {
  id: string
  slug: string
  title: string
  isPublished: boolean
  translationList: ICategoryTranslation[]
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}
