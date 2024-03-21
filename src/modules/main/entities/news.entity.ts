import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { CategoryEntity } from 'src/modules/main/entities/category.entity'
import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  thumbnail_url: string

  @ManyToOne(() => CategoryEntity, (category) => category.news_item, { eager: true })
  @JoinColumn({ name: 'category_id' })
  news_category?: CategoryEntity

  @Column({ nullable: true })
  slug: string

  @OneToMany(() => NewsTranslationEntity, (translation) => translation.news_item, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  translations: NewsTranslationEntity[]

  @Column({ default: false })
  is_published: boolean

  @Column({ nullable: true, type: 'date' })
  published_date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date

  @BeforeUpdate()
  @BeforeInsert()
  setPublishedDate(): void {
    if (this.is_published && !this.published_date) {
      this.published_date = new Date()
    } else if (!this.is_published && this.published_date) {
      this.published_date = null
    }
  }
}
