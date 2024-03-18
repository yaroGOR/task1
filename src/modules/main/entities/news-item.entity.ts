import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { NewsItemTranslationEntity } from './news-translation.entity'

@Entity('news_items')
export class NewsItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => NewsItemTranslationEntity, (translation) => translation.news_item, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  translations: NewsItemTranslationEntity[]

  @Column({ default: false })
  is_published: boolean

  @Column({ nullable: true })
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
