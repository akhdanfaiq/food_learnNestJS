import { Module } from '@nestjs/common';

import { RecipeController } from './recipe.controller.js';
import { RecipesService } from './recipe.service.js';

@Module({
  controllers: [RecipeController],
  providers: [RecipesService],
})
export class RecipeModule {}
