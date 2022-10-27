import { Module } from '@nestjs/common';
import {
  Page0Food,
  Page1Food,
  Page2Food,
  Page3Food,
  Page4Food,
  Page5Food,
  Page6Food,
} from '../entities/food-page.model';
import {
  Page0FoodSchema,
  Page1FoodSchema,
  Page2FoodSchema,
  Page3FoodSchema,
  Page4FoodSchema,
  Page5FoodSchema,
  Page6FoodSchema,
} from '../entities/food-page.schema';

import {
  Pages0FoodService,
  Pages1FoodService,
  Pages2FoodService,
  Pages3FoodService,
  Pages4FoodService,
  Pages5FoodService,
  Pages6FoodService,
} from './service';
import {
  Pages0FoodResolver,
  Pages1FoodResolver,
  Pages2FoodResolver,
} from './resolvers';
import {
  Pages0FoodRepository,
  Pages1FoodRepository,
  Pages2FoodRepository,
  Pages3FoodRepository,
  Pages4FoodRepository,
  Pages5FoodRepository,
  Pages6FoodRepository,
} from './food-pages.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodProductsModule } from '../../products/food-products/food-products.module';

@Module({
  imports: [
    FoodProductsModule,
    MongooseModule.forFeature(
      [
        { name: Page0Food.name, schema: Page0FoodSchema },
        { name: Page1Food.name, schema: Page1FoodSchema },
        { name: Page2Food.name, schema: Page2FoodSchema },
        { name: Page3Food.name, schema: Page3FoodSchema },
        { name: Page4Food.name, schema: Page4FoodSchema },
        { name: Page5Food.name, schema: Page5FoodSchema },
        { name: Page6Food.name, schema: Page6FoodSchema },
      ],
      'pagesFoodDB',
    ),
  ],
  providers: [
    Pages0FoodService,
    Pages1FoodService,
    Pages2FoodService,
    Pages3FoodService,
    Pages4FoodService,
    Pages5FoodService,
    Pages6FoodService,
    Pages0FoodResolver,
    Pages1FoodResolver,
    Pages2FoodResolver,
    Pages0FoodRepository,
    Pages1FoodRepository,
    Pages2FoodRepository,
    Pages3FoodRepository,
    Pages4FoodRepository,
    Pages5FoodRepository,
    Pages6FoodRepository,
  ],
  exports: [
    Pages0FoodService,
    Pages1FoodService,
    Pages2FoodService,
    Pages3FoodService,
    Pages0FoodRepository,
    Pages1FoodRepository,
    Pages2FoodRepository,
    Pages3FoodRepository,
  ],
})
export class FoodPagesModule {}
