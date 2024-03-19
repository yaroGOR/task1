import { LanguageSlugEnum } from 'src/modules/news/enums/language.enum'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { CategoryEntity } from './category.entity'

@Entity('category_translations')
export class CategoryTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: LanguageSlugEnum, default: LanguageSlugEnum.EN })
  language_slug: LanguageSlugEnum

  @ManyToOne(() => CategoryEntity, (category) => category.translations)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @Column()
  title: string
}
