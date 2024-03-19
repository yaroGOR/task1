import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ICategory } from 'src/modules/categories/interfaces/categories'

import { CreateCategoryRequestDto } from 'src/modules/categories/dto/requests/create-category.dto'

import { CategoriesService } from 'src/modules/categories/services/categories.service'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The news item has been successfully created' })
  async createOne(@Body() createCategoryDto: CreateCategoryRequestDto): Promise<{ data: ICategory }> {
    return await this.categoriesService.createOne(createCategoryDto)
  }
}
