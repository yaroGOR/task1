import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { CategoryEntity } from 'src/modules/categories/entities/category.entity'
import { NewsItemTranslationEntity } from 'src/modules/news/entities/news-translation.entity'

@Entity('news_items')
export class NewsItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => CategoryEntity, (category) => category.news_item, { eager: true })
  @JoinColumn({ name: 'category_id' })
  news_category?: CategoryEntity

  @OneToMany(() => NewsItemTranslationEntity, (translation) => translation.news_item, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  translations: NewsItemTranslationEntity[]

  @Column({ default: false })
  is_published: boolean

  @Column({ nullable: true, type: 'date' })
  published_date: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string

  @BeforeUpdate()
  @BeforeInsert()
  setPublishedDate(): void {
    if (this.is_published && !this.published_date) {
      this.published_date = new Date().toISOString()
    } else if (!this.is_published && this.published_date) {
      this.published_date = null
    }
  }
}
