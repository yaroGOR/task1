import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoriesModule } from 'src/modules/categories/categories.module'

import { NewsItemEntity } from 'src/modules/news/entities/news-item.entity'
import { NewsItemTranslationEntity } from 'src/modules/news/entities/news-translation.entity'

import { NewsItemController } from 'src/modules/news/controllers/news-item.controller'

import { NewsService } from 'src/modules/news/services/news.service'

import { NewsDataMapper } from 'src/modules/news/data-mappers/news-item.data-mapper'

@Module({
  imports: [CategoriesModule, TypeOrmModule.forFeature([NewsItemEntity, NewsItemTranslationEntity])],
  controllers: [NewsItemController],
  providers: [NewsService, NewsDataMapper],
})
export class NewsModule {}
