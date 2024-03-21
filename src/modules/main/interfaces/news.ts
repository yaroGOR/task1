import { LanguageSlugEnum } from 'src/modules/main/enums/language.enum'

import { ICategory } from 'src/modules/main/interfaces/categories'

export interface INewsTranslation {
  title: string
  description: string
  language: LanguageSlugEnum
}

export interface INews {
  id: string
  translations: INewsTranslation[]
  isPublished: boolean
  slug?: string
  newsCategory?: ICategory | null
  publishedAt: Date | null
  createdAt: Date
  title?: string
}
