import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { CreateCategoryTranslationDto } from 'src/modules/main/dto/create-category-translation.dto'

export class CreateCategoryRequestDto extends GenericDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  thumbanilUrl?: string

  @ApiProperty({ default: false })
  @IsBoolean()
  isPublished = false

  @Expose()
  @Type(() => CreateCategoryTranslationDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CreateCategoryTranslationDto] })
  translationList: CreateCategoryTranslationDto[]
}
