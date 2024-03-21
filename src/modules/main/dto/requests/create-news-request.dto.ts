import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { CreateNewsTranslationDto } from 'src/modules/main/dto/create-translation.dto'

export class CreateNewsRequestDto extends GenericDto {
  @Expose()
  @Type(() => CreateNewsTranslationDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [CreateNewsTranslationDto] })
  translationList: CreateNewsTranslationDto[]

  @Expose()
  @ApiProperty({ required: false, default: null })
  @IsOptional()
  @IsUUID(4)
  newsCategory?: string

  @ApiProperty({ required: true, default: 'slug' })
  @IsString()
  slug: string

  @ApiProperty({ required: false, default: null })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string

  @Expose()
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isPublished?: boolean
}
