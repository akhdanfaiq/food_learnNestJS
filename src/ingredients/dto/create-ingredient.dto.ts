import { Type } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateIngredientDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    recipeId!: number

    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    unit!: string

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    qty!: number
}
