import { Module } from '@nestjs/common';
import { FoodProductsService } from './food-products.service';
import { FoodProductsResolver } from './food-products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Meal } from './entities/food-product.model';
import { MealSchema } from './entities/food-product.schema';
import { MealProductsRepository } from './food-products.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Meal.name, schema: MealSchema }],
      'foodsDB',
    ),
  ],
  providers: [
    FoodProductsResolver,
    FoodProductsService,
    MealProductsRepository,
  ],
  exports: [FoodProductsService, MealProductsRepository],
})
export class FoodProductsModule {}
