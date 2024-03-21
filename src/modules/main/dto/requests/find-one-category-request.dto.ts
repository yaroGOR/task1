import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsUUID } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class FindOneCategoryRequestDto extends GenericDto {
  @Expose()
  @ApiProperty()
  @IsUUID(4)
  uuid: string
}
