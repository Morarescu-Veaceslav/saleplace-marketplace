import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { AdminOnly } from 'src/shared/decorators/admin.decorator';
import { CreateCategoryInput } from './inputs/CreateCategoryInput';
import { UpdateCategoryInput } from './inputs/UpdateCategoryInput';
import { CategoryModel } from './models/category.model';
import { Authorization } from 'src/shared/decorators/auth.decorator';

@Resolver('Category')
export class CategoryResolver {
  public constructor(private readonly categoryService: CategoryService) { }

  @Mutation(() => Boolean, { name: 'createCategory' })
  @Authorization()
  @AdminOnly()
  public async create(@Args('data') input: CreateCategoryInput) {
    return this.categoryService.create(input)
  }

  @Mutation(() => Boolean, { name: 'editCategory' })
  @Authorization()
  @AdminOnly()
  async updateCategory(@Args('id') id: string, @Args('data') input: UpdateCategoryInput) {
    return this.categoryService.updateCategory(id, input)
  }

  @Query(() => [CategoryModel], { name: 'allCategory' })
  async categoriesTree() {
    return this.categoryService.getAllCategoriesTree()
  }
}
