import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NotFoundError } from 'rxjs'
import { SORT_COLUMN_QUERY_PARAM, SORT_DIRECTION_QUERY_PARAM } from 'src/modules/main/constants/query-params.constants'
import { SortColumnEnum } from 'src/modules/main/enums/sort-column.enum'
import { UpdateResult } from 'typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { PaginationQueryParamsDto } from 'src/core/dto/pagination-query-params.dto'
import { PaginatedResponseDto } from 'src/core/dto/pagination-response.dto'

import { ICategory } from 'src/modules/main/interfaces/categories'

import { SortQueryParams } from 'src/modules/main/dto/queries/sort-category-query-params.dto'
import { CreateCategoryRequestDto } from 'src/modules/main/dto/requests/create-category-request.dto'
import { UpdateCategoryDtoRequest } from 'src/modules/main/dto/requests/update-category-request.dto'

import { CategoryTranslationEntity } from 'src/modules/main/entities/category-translation.entity'
import { CategoryEntity } from 'src/modules/main/entities/category.entity'

import { CategoryDataMapper } from 'src/modules/main/data-mappers/categories.data-mapper'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>,
    @InjectRepository(CategoryTranslationEntity)
    private categoryTranslationRepository: Repository<CategoryTranslationEntity>,
    private categoryDataMapper: CategoryDataMapper,
  ) {}

  async createOne(createCategoryDto: CreateCategoryRequestDto): Promise<{ data: ICategory }> {
    const { translationList } = createCategoryDto

    const newCategory = new CategoryEntity()

    newCategory.translations = []

    for (const translation of translationList) {
      const newTranslation = new CategoryTranslationEntity()

      newTranslation.title = translation.title
      newTranslation.language_slug = translation.lang
      newCategory.translations.push(newTranslation)
    }

    const savedCategory = await this.categoriesRepository.save(newCategory)

    return { data: this.categoryDataMapper.categoryToCreateView(savedCategory) }
  }

  async findOne(categoryUuid: string): Promise<{ data: ICategory | null }> {
    const category = await this.categoriesRepository.findOne({ where: { id: categoryUuid } })

    if (!category) {
      throw new NotFoundException()
    }

    return { data: this.categoryDataMapper.categoryToGeByUuidView(category) }
  }

  async updateOne(updateCategoryDto: UpdateCategoryDtoRequest, id: string): Promise<{ data: ICategory | null }> {
    const { isPublished, translationList } = updateCategoryDto
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['translations'],
    })

    if (!category) {
      throw new NotFoundException()
    }

    category.is_published = isPublished

    if (translationList && translationList.length > 0) {
      for (const translation of translationList) {
        const existingTranslation = category.translations.find((t) => t.language_slug === translation.lang)
        if (existingTranslation) {
          existingTranslation.title = translation.title
        } else {
          const newTranslation = this.categoryTranslationRepository.create({
            category,
            language_slug: translation.lang,
            title: translation.title,
          })

          category.translations.push(newTranslation)
        }
      }
    }

    const updatedCategory = await this.categoriesRepository.save(category)

    return { data: this.categoryDataMapper.categoryToGeByUuidView(updatedCategory) }
  }

  async findMany(
    paginationQueryParams?: PaginationQueryParamsDto,
    sortQueryParams?: SortQueryParams,
  ): Promise<PaginatedResponseDto<ICategory>> {
    let sortColumn
    let sortDirection
    const order: { [key: string]: 'ASC' | 'DESC' } = {}
    let page = 1
    let limit = 10
    let skip = 0

    if (paginationQueryParams) {
      page = paginationQueryParams.page || 1
      limit = paginationQueryParams.pageSize || 10
      skip = (page - 1) * limit
    }

    if (sortQueryParams) {
      sortColumn = sortQueryParams[SORT_COLUMN_QUERY_PARAM] || 'id'
      sortDirection = sortQueryParams[SORT_DIRECTION_QUERY_PARAM] || 'DESC'
    }

    if (sortColumn === 'title') {
      // TODO: implement sorting by title
      throw new BadRequestException('Sorting by title is unavailible now')
    } else {
      order[SortColumnEnum[sortColumn]] = sortDirection
    }

    const [categoriesList, count] = await this.categoriesRepository.findAndCount({
      skip,
      take: limit,
      order,
    })

    if (!categoriesList) {
      return new PaginatedResponseDto([], page, count, limit)
    }

    return this.categoryDataMapper.categoriesToPaginatedView(categoriesList, page, count, limit)
  }

  async deleteByUuid(uuid: string): Promise<UpdateResult> {
    if (!(await this.categoriesRepository.findOne({ where: { id: uuid } }))) {
      throw new NotFoundException()
    }

    return await this.categoriesRepository.softDelete({ id: uuid })
  }
}
