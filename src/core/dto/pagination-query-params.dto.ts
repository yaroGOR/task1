import { ApiProperty } from '@nestjs/swagger'

export class PaginationQueryParamsDto {
  @ApiProperty({ description: 'Pagination query limit parameter' })
  pageSize: number

  @ApiProperty({ description: 'Pagination query page number parameter' })
  page: number
}
