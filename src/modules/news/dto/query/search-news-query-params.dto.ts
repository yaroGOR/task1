import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional, IsString } from 'class-validator'
import {
  NEWS_CATEGORY_QUERY_PARAM,
  PUBLISHED_AFTER_QUERY_PARAM,
  PUBLISHED_BEFORE_QUERY_PARAM,
  SEARCH_TERM_QUERY_PARAM,
} from 'src/modules/news/constants/query-params.constants'

export class SearchNewsQueryParams {
  @ApiProperty({ required: false, description: 'Search term for news title or description' })
  @IsOptional()
  @IsString()
  [SEARCH_TERM_QUERY_PARAM]?: string;

  @ApiProperty({ required: false, description: 'Filter news items published before this  (timestamp)' })
  @IsOptional()
  @IsNumberString()
  [PUBLISHED_BEFORE_QUERY_PARAM]?: string;

  @ApiProperty({ required: false, description: 'Filter news items published after this date (timestamp)' })
  @IsOptional()
  @IsNumberString()
  [PUBLISHED_AFTER_QUERY_PARAM]?: string;

  @ApiProperty({ required: false, description: 'Filter news items by category ID' })
  @IsOptional()
  @IsString()
  [NEWS_CATEGORY_QUERY_PARAM]?: string
}
