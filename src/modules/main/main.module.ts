import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryDataMapper } from './data-mappers/categories.data-mapper'

import { CategoryTranslationEntity } from 'src/modules/main/entities/category-translation.entity'
import { CategoryEntity } from 'src/modules/main/entities/category.entity'
import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { CategoriesController } from 'src/modules/main/controllers/categories.controller'
import { NewsController } from 'src/modules/main/controllers/news.controller'

import { CategoriesService } from 'src/modules/main/services/categories.service'
import { NewsService } from 'src/modules/main/services/news.service'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, NewsTranslationEntity, CategoryEntity, CategoryTranslationEntity])],
  controllers: [NewsController, CategoriesController],
  providers: [NewsService, NewsDataMapper, CategoriesService, CategoryDataMapper],
})
export class MainModule {}
