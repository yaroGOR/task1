import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { LanguageSlugEnum } from 'src/modules/main/enums/language.enum'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class UpdateCategoryTranslationDto extends GenericDto {
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
  @IsOptional()
  @IsEnum(LanguageSlugEnum)
  @ApiProperty({ enum: LanguageSlugEnum })
  lang: LanguageSlugEnum
}
