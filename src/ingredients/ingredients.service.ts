import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto.js';
import { UpdateIngredientDto } from './dto/update-ingredient.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import console from 'console';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIngredientDto: CreateIngredientDto) {
    //grab data request based on DTO
    const { recipeId, name, qty, unit } = createIngredientDto;

    //because there is "recipe_id", so we have to ensure that selected recipe already exist
    const selectedRecipe = await this.prisma.recipe.findFirst({
      where: { id: recipeId },
    });

    //handle if selected recipe not exist
    if (!selectedRecipe) {
      throw new NotFoundException(`Recipe doesn't exist`);
    }

    //process insert to table
    await this.prisma.ingredient.create({
      data: {recipeId, unit, name, qty },
    });

    return {
      message: `New ingredient has created`,
    };
  }

  async findAll() {
    //grab all data from table
    const ingredients = await this.prisma.ingredient.findMany();
    return {
      message: `All ingredient has loaded`,
      data: ingredients,
    };
  }

  async findOne(id: number) {
    //grab ingredient based on selected id
    const ingredient = await this.prisma.ingredient.findFirst({
      where: { id },
    });
    //handle if ingredient doesnt exist
    if (!ingredient) {
      throw new NotFoundException(`Ingredient Not Found`);
    }

    return{
      message: `Ingredient has found`,
      data: ingredient
    }
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    //before update we should check that selecteed ingredients already exist
    const selectedIngredient = await this.prisma.ingredient.findFirst({where: {id}})
    // handle if selected ingredients was not found
    if (!selectedIngredient){
      throw new NotFoundException(`Ingredient not found`)
    }

    //grab request data from DTO
    const {
      name, qty, unit, recipeId
    } = updateIngredientDto

    //check recipeId and nsure that selected recipe already exist
    if(recipeId){
      const selectedRecipe = await this.prisma.recipe.findFirst({where : {id: recipeId}})
      if (selectedRecipe){
          throw new NotFoundException (`Recipe Not found`)
      }
    }
    //updating table
    await this.prisma.ingredient.update({where : {id}, data: {name, qty, unit, recipeId}})

    return{
      message : `ingredient has updated sucessfully`
    }
  }

  async remove(id: number) {
  //ensure that selected ingredient has already exist
   const selectedIngredient = await this.prisma.ingredient.findFirst({where: {id}})

   if(!selectedIngredient){
    throw new NotFoundException (`Ingredient not found`)
   }
   
   //deleting ingredient
   await this.prisma.ingredient.delete({where: {id}})

   return{
    message : `Ingredient has removed sucessfully`
   }
  }
}
