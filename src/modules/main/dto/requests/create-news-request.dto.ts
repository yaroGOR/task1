import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { CreateNewsTranslationDto } from 'src/modules/main/dto/create-translation.dto'

export class CreateNewsItemRequestDto extends GenericDto {
  @Expose()
  @Type(() => CreateNewsTranslationDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CreateNewsTranslationDto] })
  translations: CreateNewsTranslationDto[]

  @Expose()
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isPublished?: boolean
}
