import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { CATEGORY_UUID } from 'src/modules/main/constants/route-params.constants'

export class CategoryUuidRouteParamDto {
  @ApiProperty({
    description: 'Category  UUID',
    type: 'string',
    required: true,
  })
  @IsUUID(4)
  [CATEGORY_UUID]: string
}
