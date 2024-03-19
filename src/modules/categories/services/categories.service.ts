import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { ICategory } from 'src/modules/categories/interfaces/categories'

import { CreateCategoryRequestDto } from 'src/modules/categories/dto/requests/create-category.dto'

import { CategoryTranslationEntity } from 'src/modules/categories/entities/category-translation.entity'
import { CategoryEntity } from 'src/modules/categories/entities/category.entity'

import { CategoryDataMapper } from 'src/modules/categories/data-mappers/categories.data-mapper'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>,
    @InjectRepository(CategoryTranslationEntity)
    private categoryTranslationRepository: Repository<CategoryTranslationEntity>,
    private categoryDataMapper: CategoryDataMapper,
  ) {}

  async createOne(createCategoryDto: CreateCategoryRequestDto): Promise<{ data: ICategory }> {
    const { translations } = createCategoryDto

    const newCategory = new CategoryEntity()

    newCategory.translations = []

    for (const translation of translations) {
      const newTranslation = new CategoryTranslationEntity()

      newTranslation.title = translation.title
      newTranslation.language_slug = translation.languageSlug
      newCategory.translations.push(newTranslation)
    }

    const savedCategory = await this.categoriesRepository.save(newCategory)

    return { data: this.categoryDataMapper.categoryToCreateView(savedCategory) }
  }

  async findOne(categoryUuid: string): Promise<{ data: ICategory | null }> {
    const category = await this.categoriesRepository.findOne({ where: { id: categoryUuid } })

    if (!category) {
      return { data: null }
    }

    return { data: this.categoryDataMapper.categoryToGeByUuidView(category) }
  }
}
