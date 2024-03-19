import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsString } from 'class-validator'
import { LanguageSlugEnum } from 'src/modules/news/enums/language.enum'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class CreateCategoryTranslationDto extends GenericDto {
  @Expose()
  @IsString()
  @ApiProperty()
  title: string

  @Expose()
  @IsEnum(LanguageSlugEnum)
  @ApiProperty({ enum: LanguageSlugEnum })
  languageSlug: LanguageSlugEnum
}
