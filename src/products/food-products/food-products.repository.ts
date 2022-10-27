import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryFood } from 'src/common/abstract';
import { Meal } from './entities/food-product.model';
import { FoodDocument } from './entities/food-product.schema';

@Injectable()
export class MealProductsRepository extends AbstractRepositoryFood<FoodDocument> {
  protected readonly logger = new Logger(MealProductsRepository.name);
  constructor(
    @InjectModel(Meal.name, 'foodsDB')
    foodModel: Model<FoodDocument>,
  ) {
    super(foodModel);
  }
}