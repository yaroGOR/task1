import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsUUID, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { CreateNewsTranslationDto } from 'src/modules/news/dto/create-translation.dto'

export class CreateNewsItemRequestDto extends GenericDto {
  @Expose()
  @Type(() => CreateNewsTranslationDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CreateNewsTranslationDto] })
  translations: CreateNewsTranslationDto[]

  @Expose()
  @ApiProperty({ required: false, default: null })
  @IsOptional()
  @IsUUID(4)
  categoryUuid?: string

  @Expose()
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isPublished?: boolean
}
