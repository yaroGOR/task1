import { LanguageSlugEnum } from 'src/modules/main/enums/language.enum'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Entity('news_translations')
export class NewsTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: LanguageSlugEnum, default: LanguageSlugEnum.EN })
  language_slug: LanguageSlugEnum

  @Column()
  title: string

  @Column()
  description: string

  @ManyToOne(() => NewsEntity, (news) => news.translations)
  @JoinColumn({ name: 'news_id' })
  news_item: NewsEntity
}
