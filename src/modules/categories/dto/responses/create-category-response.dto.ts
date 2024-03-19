import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsString, IsUUID, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { CreateCategoryTranslationDto } from 'src/modules/categories/dto/create-category-translation.dto'

export class CreateCategoryResponseDto extends GenericDto {
  @Expose()
  @IsUUID(4)
  @ApiProperty({ description: 'Category UUID' })
  uuid: string

  @Expose()
  @Type(() => CreateCategoryTranslationDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CreateCategoryTranslationDto] })
  translations: CreateCategoryTranslationDto[]

  @Expose()
  @IsString()
  @ApiProperty({ description: 'Category date created' })
  createdAt: string
}
