import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { SORT_COLUMN_QUERY_PARAM, SORT_DIRECTION_QUERY_PARAM } from 'src/modules/main/constants/query-params.constants'

export class SortQueryParams {
  @ApiProperty({ required: false, description: 'Search term for news title or description' })
  @IsOptional()
  @IsString()
  [SORT_COLUMN_QUERY_PARAM]: string;

  @ApiProperty({ required: false, description: 'Filter news s published before this  (ISO)' })
  @IsOptional()
  @IsString()
  [SORT_DIRECTION_QUERY_PARAM]: string
}
