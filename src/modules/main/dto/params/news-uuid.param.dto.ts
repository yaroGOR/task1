import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { NEWS_UUID } from 'src/modules/main/constants/route-params.constants'

export class NewsUuidRouteParamDto {
  @ApiProperty({
    description: 'News  UUID',
    type: 'string',
    required: true,
  })
  @IsUUID(4)
  [NEWS_UUID]: string
}
