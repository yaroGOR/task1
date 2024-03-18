import { LanguageSlugEnum } from 'src/modules/main/enums/language.enum'

export interface INewsTranslationItem {
  title: string
  description: string
  language: LanguageSlugEnum
}

export interface INewsToListView {
  uuid: string
  isPublished: boolean
  translations: INewsTranslationItem[]
  datePublished: string
  dateCreated: string
}

export interface INewsToItemByUuidView {
  uuid: string
  translations: INewsTranslationItem[]
  isPublished: boolean
  datePublished: string
  dateCreated: string
}

export interface INewsToCreateView {
  uuid: string
  translations: INewsTranslationItem[]
  isPublished: boolean
  datePublished: string
  dateCreated: string
}
