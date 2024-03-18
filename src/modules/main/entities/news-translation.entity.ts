import { LanguageSlugEnum } from 'src/modules/main/enums/language.enum'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsItemEntity } from 'src/modules/main/entities/news-item.entity'

@Entity('news_item_translation')
export class NewsItemTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: LanguageSlugEnum, default: LanguageSlugEnum.EN })
  language_slug: LanguageSlugEnum

  @Column()
  title: string

  @Column()
  description: string

  @ManyToOne(() => NewsItemEntity, (newsItem) => newsItem.translations)
  @JoinColumn({ name: 'news_item_id' })
  news_item: NewsItemEntity
}
