import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { CreateCategoryTranslationDto } from 'src/modules/categories/dto/create-category-translation.dto'

export class CreateCategoryRequestDto extends GenericDto {
  @Expose()
  @Type(() => CreateCategoryTranslationDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CreateCategoryTranslationDto] })
  translations: CreateCategoryTranslationDto[]
}
