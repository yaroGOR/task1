import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsOptional, IsString } from 'class-validator'
import {
  NEWS_CATEGORY_QUERY_PARAM,
  PUBLISHED_AFTER_QUERY_PARAM,
  PUBLISHED_BEFORE_QUERY_PARAM,
  SEARCH_TERM_QUERY_PARAM,
} from 'src/modules/main/constants/query-params.constants'

export class SearchNewsQueryParams {
  @ApiProperty({ required: false, description: 'Search term for news title or description' })
  @IsOptional()
  @IsString()
  [SEARCH_TERM_QUERY_PARAM]?: string;

  @ApiProperty({ required: false, description: 'Filter news s published before this  (ISO)' })
  @IsOptional()
  @IsDateString()
  [PUBLISHED_BEFORE_QUERY_PARAM]?: string;

  @ApiProperty({ required: false, description: 'Filter news s published after this date (ISO)' })
  @IsOptional()
  @IsDateString()
  [PUBLISHED_AFTER_QUERY_PARAM]?: string;

  @ApiProperty({ required: false, description: 'Filter news s by category ID' })
  @IsOptional()
  @IsString()
  [NEWS_CATEGORY_QUERY_PARAM]?: string
}
