import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CATEGORY_UUID } from 'src/modules/main/constants/route-params.constants'
import { UpdateResult } from 'typeorm'

import { PaginationQueryParamsDto } from 'src/core/dto/pagination-query-params.dto'
import { PaginatedResponseDto } from 'src/core/dto/pagination-response.dto'

import { ICategory } from 'src/modules/main/interfaces/categories'

import { CategoryUuidRouteParamDto } from 'src/modules/main/dto/params/category-uuid.param.dto'
import { SortQueryParams } from 'src/modules/main/dto/queries/sort-category-query-params.dto'
import { CreateCategoryRequestDto } from 'src/modules/main/dto/requests/create-category-request.dto'
import { UpdateCategoryDtoRequest } from 'src/modules/main/dto/requests/update-category-request.dto'

import { CategoriesService } from 'src/modules/main/services/categories.service'

@ApiTags('News Categories')
@Controller('news-category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The news  has been successfully created' })
  @Post('/item')
  async createOne(@Body() createCategoryDto: CreateCategoryRequestDto): Promise<{ data: ICategory }> {
    return await this.categoriesService.createOne(createCategoryDto)
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200 })
  @Put(`/item/:${CATEGORY_UUID}`)
  async updateOne(
    @Param() categoryUuidRouteParamDto: CategoryUuidRouteParamDto,
    @Body() updateCategoryDto: UpdateCategoryDtoRequest,
  ): Promise<{ data: ICategory }> {
    return await this.categoriesService.updateOne(updateCategoryDto, categoryUuidRouteParamDto[CATEGORY_UUID])
  }

  @ApiOperation({ summary: 'Get category by UUID' })
  @ApiResponse({ status: 200 })
  @Get(`/item/:${CATEGORY_UUID}`)
  async getOne(@Param() categoryUuidRouteParamDto: CategoryUuidRouteParamDto): Promise<{ data: ICategory }> {
    return await this.categoriesService.findOne(categoryUuidRouteParamDto[CATEGORY_UUID])
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get paginated categories' })
  @ApiResponse({ status: 200 })
  async getMany(
    @Query() paginationQueryParams: PaginationQueryParamsDto,
    @Query() sortQueryParams: SortQueryParams,
  ): Promise<PaginatedResponseDto<ICategory>> {
    return await this.categoriesService.findMany(paginationQueryParams, sortQueryParams)
  }

  @Get('/reference')
  @ApiOperation({ summary: 'Get all Categories' })
  @ApiResponse({ status: 200 })
  async getReference(): Promise<PaginatedResponseDto<ICategory>> {
    return await this.categoriesService.findMany()
  }

  @Delete(`/item/:${CATEGORY_UUID}`)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The news  has been successfully created' })
  async deleteOne(@Param() categoryUuidRouteParamDto: CategoryUuidRouteParamDto): Promise<UpdateResult> {
    return await this.categoriesService.deleteByUuid(categoryUuidRouteParamDto[CATEGORY_UUID])
  }
}
