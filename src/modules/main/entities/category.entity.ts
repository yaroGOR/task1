import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { CategoryTranslationEntity } from './category-translation.entity'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => NewsEntity, (news) => news.news_category)
  news_item: NewsEntity

  @OneToMany(() => CategoryTranslationEntity, (translation) => translation.category, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  translations: CategoryTranslationEntity[]

  @Column({ nullable: true, default: 'categorySlug' })
  slug: string

  @Column({ type: 'boolean', default: false })
  is_published: boolean

  @Column({ type: 'date' })
  @Column({ nullable: true, type: 'date' })
  published_date?: Date

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
