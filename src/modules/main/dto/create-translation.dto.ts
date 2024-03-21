import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { LanguageSlugEnum } from 'src/modules/main/enums/language.enum'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class CreateNewsTranslationDto extends GenericDto {
  @Expose()
  @IsString()
  @ApiProperty()
  title: string

  @Expose()
  @IsString()
  @ApiProperty()
  description: string

  @Expose()
  @IsEnum(LanguageSlugEnum)
  @ApiProperty({ enum: LanguageSlugEnum })
  lang: LanguageSlugEnum

  @IsString()
  @IsOptional()
  thumbnailUrl: string
}
