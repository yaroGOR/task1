import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'
import { LanguageSlugEnum } from 'src/modules/main/enums/language.enum'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class CreateCategoryTranslationDto extends GenericDto {
  @Expose()
  @IsString()
  @ApiProperty()
  title: string

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string

  @Expose()
  @IsEnum(LanguageSlugEnum)
  @ApiProperty({ enum: LanguageSlugEnum })
  lang: LanguageSlugEnum

  @IsOptional()
  @IsUUID(4)
  newsCategory: string

  @IsBoolean()
  @IsOptional()
  isPublished: boolean
}
