import { CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { CategoryTranslationEntity } from './category-translation.entity'

import { NewsItemEntity } from 'src/modules/news/entities/news-item.entity'

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => NewsItemEntity, (newsItem) => newsItem.news_category)
  news_item: NewsItemEntity

  @OneToMany(() => CategoryTranslationEntity, (translation) => translation.category, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  translations: CategoryTranslationEntity[]

  @CreateDateColumn()
  date_created: string
}
