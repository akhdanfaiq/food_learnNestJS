import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto.js';
import { UpdateRecipeDto } from './dto/update-recipe.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RecipesService {
  /**constructor for call prismaService */
  constructor(private readonly prisma: PrismaService) { }
  async create(createRecipeDto: CreateRecipeDto) {
    /** grab dto */
    const { title, description, serving, cooking_time, difficulty } = createRecipeDto
    /** insert into recipe */
    await this.prisma.recipe.create({
      data: {title, description, serving, cooking_time, difficulty}
    })
    return {
      message: `new recipe has been created`,
    }
  }

  async findAll() {
    /**async -> asynchronous
     * proses that has possibility for success or failed
     * usualy process from third party
     */

    /**load data from "recipes" table */
    const recipes = await this.prisma.recipe.findMany()
    // select * from recipes; -> findMany/findAll
    return {
      message: `Recipes has been loaded`,
      data: recipes
    }
  }

  async findOne(id: number) {
    /**get one recepi based on selected ID */
    const recipe = await this.prisma.recipe.findFirst({
      where: { id }
    })
    // select * from recipes where id=?
    if (!recipe) {
      // if selected recipe not found, then
      throw new NotFoundException(`Recipe not found`)
    }
    return {
      message: `Recepe has found`,
      data: recipe
    }
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    // endsure recipe exsist
    const selectedRecipe = await this.prisma.recipe.findFirst({
      where: { id }
    })
    if (!selectedRecipe) {
      throw new NotFoundException(`Recipe not found`)
    }
    const { title, description, serving, cooking_time, difficulty } = updateRecipeDto
    //proses update
    await this.prisma.recipe.update({
      where: { id },
      data: { title, serving, cooking_time, difficulty, description }
    })
    return {
      massage: `Recipe has update`
    }
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}