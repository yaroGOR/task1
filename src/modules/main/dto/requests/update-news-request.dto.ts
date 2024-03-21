import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { UpdateCategoryTranslationDto } from 'src/modules/main/dto/update-category-translation.dto'

export class UpdateNewsDtoRequest extends GenericDto {
  @IsOptional()
  @IsBoolean()
  isPublished: boolean

  @IsOptional()
  @IsString()
  slug: string

  @Type(() => UpdateCategoryTranslationDto)
  @ValidateNested({ each: true })
  @IsOptional()
  @ApiProperty({ type: [UpdateCategoryTranslationDto] })
  translationList: UpdateCategoryTranslationDto[]
}
