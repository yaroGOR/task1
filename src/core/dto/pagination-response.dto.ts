import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponseDto<T> {
  constructor(items: T[], page: number, limit: number, total: number) {
    this.data = items

    this.meta = { total }
  }

  @ApiProperty({ description: 'Total Items Count' })
  meta: { total: number }

  @ApiProperty({ description: 'Pagianted items' })
  data: T[]

  @ApiProperty({ description: 'Page number' })
  page: number

  @ApiProperty({ description: 'Items per page' })
  linit: number
}
