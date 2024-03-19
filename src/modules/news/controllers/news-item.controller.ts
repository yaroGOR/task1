import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NEWS_UUID } from 'src/modules/news/constants/route-params.constants'

import { INewsToCreateView, INewsToItemByUuidView, INewsToListView } from 'src/modules/news/interfaces/news'

import { NewsUuidRouteParamDto } from 'src/modules/news/dto/params/news-item-uuid.param.dto'
import { SearchNewsQueryParams } from 'src/modules/news/dto/query/search-news-query-params.dto'
import { CreateNewsItemRequestDto } from 'src/modules/news/dto/requests/create-news-request.dto'

import { NewsService } from 'src/modules/news/services/news.service'

@ApiTags('News Items')
@Controller('news')
export class NewsItemController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news item' })
  @ApiResponse({ status: 201, description: 'The news item has been successfully created' })
  async createOne(@Body() createNewsItemDto: CreateNewsItemRequestDto): Promise<{ data: INewsToCreateView }> {
    return await this.newsService.createOne(createNewsItemDto)
  }

  @Get('list')
  @ApiOperation({ summary: 'Get a list of news items' })
  @ApiResponse({ status: 200, description: 'Returns a list of news items' })
  async getList(@Query() searchNewsQueryParams: SearchNewsQueryParams): Promise<{ data: INewsToListView[] }> {
    return await this.newsService.getList(searchNewsQueryParams)
  }

  @Get(`item/:${NEWS_UUID}`)
  @ApiOperation({ summary: 'Get a news item by UUID' })
  @ApiResponse({ status: 200, description: 'Returns the news item with the specified UUID' })
  async getItem(@Param() newsUuidRouteParamDto: NewsUuidRouteParamDto): Promise<{ data: INewsToItemByUuidView }> {
    return await this.newsService.getItemByUuid(newsUuidRouteParamDto[NEWS_UUID])
  }
}