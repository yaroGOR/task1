import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsItemEntity } from 'src/modules/main/entities/news-item.entity'
import { NewsItemTranslationEntity } from 'src/modules/main/entities/news-translation.entity'

import { NewsItemController } from 'src/modules/main/controllers/news-item.controller'

import { NewsService } from 'src/modules/main/services/news.service'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news-item.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([NewsItemEntity, NewsItemTranslationEntity]), ScheduleModule.forRoot()],
  controllers: [NewsItemController],
  providers: [NewsService, NewsDataMapper],
})
export class MainModule {}
