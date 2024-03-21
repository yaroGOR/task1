import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CATEGORY_UUID, NEWS_UUID } from 'src/modules/main/constants/route-params.constants'
import { UpdateResult } from 'typeorm'

import { PaginationQueryParamsDto } from 'src/core/dto/pagination-query-params.dto'
import { PaginatedResponseDto } from 'src/core/dto/pagination-response.dto'

import { INews } from 'src/modules/main/interfaces/news'

import { NewsUuidRouteParamDto } from 'src/modules/main/dto/params/news-uuid.param.dto'
import { SearchNewsQueryParams } from 'src/modules/main/dto/queries/search-news-query-params.dto'
import { SortQueryParams } from 'src/modules/main/dto/queries/sort-category-query-params.dto'
import { CreateNewsRequestDto } from 'src/modules/main/dto/requests/create-news-request.dto'
import { UpdateNewsDtoRequest } from 'src/modules/main/dto/requests/update-news-request.dto'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News s')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/item')
  @ApiOperation({ summary: 'Create a new news ' })
  @ApiResponse({ status: 201, description: 'The news  has been successfully created' })
  async createOne(@Body() createNewsDto: CreateNewsRequestDto): Promise<{ data: INews }> {
    return await this.newsService.createOne(createNewsDto)
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get a list of news s' })
  @ApiResponse({ status: 200, description: 'Returns a list of news s' })
  async getMany(
    @Query() searchNewsQueryParams: SearchNewsQueryParams,
    @Query() paginationQueryParamsDto: PaginationQueryParamsDto,
    @Query() sortQueryParams: SortQueryParams,
  ): Promise<PaginatedResponseDto<INews>> {
    return await this.newsService.getMany(searchNewsQueryParams, paginationQueryParamsDto, sortQueryParams)
  }

  @Get(`/item/:${NEWS_UUID}`)
  @ApiOperation({ summary: 'Get a news  by UUID' })
  @ApiResponse({ status: 200, description: 'Returns the news  with the specified UUID' })
  async getOne(@Param() newsUuidRouteParamDto: NewsUuidRouteParamDto): Promise<{ data: INews }> {
    return await this.newsService.getByUuid(newsUuidRouteParamDto[NEWS_UUID])
  }

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 200, description: 'The news  has been successfully updated' })
  @Put(`/item/:${NEWS_UUID}`)
  async updateOne(
    @Param() newsUuidRouteParamDto: NewsUuidRouteParamDto,
    @Body() updateNewsDto: UpdateNewsDtoRequest,
  ): Promise<{ data: INews }> {
    return await this.newsService.updateOne(updateNewsDto, newsUuidRouteParamDto[NEWS_UUID])
  }

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 200, description: 'The news  has been successfully deleted' })
  @Delete(`/item/:${NEWS_UUID}`)
  async deleteOne(@Param() newsUuidRouteParamDto: NewsUuidRouteParamDto): Promise<UpdateResult> {
    return await this.newsService.deleteOne(newsUuidRouteParamDto[NEWS_UUID])
  }
}
