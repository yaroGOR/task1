import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryTranslationEntity } from 'src/modules/categories/entities/category-translation.entity'
import { CategoryEntity } from 'src/modules/categories/entities/category.entity'
import { NewsItemEntity } from 'src/modules/news/entities/news-item.entity'

import { CategoriesController } from 'src/modules/categories/controllers/categories.controller'

import { CategoriesService } from 'src/modules/categories/services/categories.service'

import { CategoryDataMapper } from 'src/modules/categories/data-mappers/categories.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, NewsItemEntity, CategoryTranslationEntity])],
  controllers: [CategoriesController],
  providers: [CategoryDataMapper, CategoriesService],
  exports: [
    TypeOrmModule.forFeature([CategoryEntity, NewsItemEntity, CategoryTranslationEntity]),
    CategoriesService,
    CategoryDataMapper,
  ],
})
export class CategoriesModule {}
