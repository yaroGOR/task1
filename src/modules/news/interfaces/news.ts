import { LanguageSlugEnum } from 'src/modules/news/enums/language.enum'

import { ICategory } from 'src/modules/categories/interfaces/categories'

export interface INewsTranslationItem {
  title: string
  description: string
  language: LanguageSlugEnum
}

export interface INewsToListView {
  uuid: string
  isPublished: boolean
  translations: INewsTranslationItem[]
  newsCategory?: ICategory | null
  datePublished: string
  dateCreated: string
}

export interface INewsToItemByUuidView {
  uuid: string
  translations: INewsTranslationItem[]
  isPublished: boolean
  newsCategory?: ICategory | null
  datePublished: string
  dateCreated: string
}

export interface INewsToCreateView {
  uuid: string
  translations: INewsTranslationItem[]
  isPublished: boolean
  newsCategory?: ICategory | null
  datePublished: string
  dateCreated: string
}
