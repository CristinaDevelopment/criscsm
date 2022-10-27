import { Module } from '@nestjs/common';
import {
  Page0Wear,
  Page1Wear,
  Page2Wear,
  Page3Wear,
  Page4Wear,
  Page5Wear,
  Page6Wear,
} from '../entities/food-page.model';
import {
  Page0WearSchema,
  Page1WearSchema,
  Page2WearSchema,
  Page3WearSchema,
  Page4WearSchema,
  Page5WearSchema,
  Page6WearSchema,
} from '../entities/food-page.schema';

import {
  Pages0WearService,
  Pages1WearService,
  Pages2WearService,
  Pages3WearService,
  Pages4WearService,
  Pages5WearService,
  Pages6WearService,
} from './service';
import {
  Pages0WearResolver,
  Pages1WearResolver,
  Pages2WearResolver,
} from './resolvers';
import {
  Pages0WearRepository,
  Pages1WearRepository,
  Pages2WearRepository,
  Pages3WearRepository,
  Pages4WearRepository,
  Pages5WearRepository,
  Pages6WearRepository,
} from './wear-pages.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Page0Wear.name, schema: Page0WearSchema },
        { name: Page1Wear.name, schema: Page1WearSchema },
        { name: Page2Wear.name, schema: Page2WearSchema },
        { name: Page3Wear.name, schema: Page3WearSchema },
        { name: Page4Wear.name, schema: Page4WearSchema },
        { name: Page5Wear.name, schema: Page5WearSchema },
        { name: Page6Wear.name, schema: Page6WearSchema },
      ],
      'pagesWearDB',
    ),
  ],
  providers: [
    Pages0WearService,
    Pages1WearService,
    Pages2WearService,
    Pages3WearService,
    Pages4WearService,
    Pages5WearService,
    Pages6WearService,
    Pages0WearResolver,
    Pages1WearResolver,
    Pages2WearResolver,
    Pages0WearRepository,
    Pages1WearRepository,
    Pages2WearRepository,
    Pages3WearRepository,
    Pages4WearRepository,
    Pages5WearRepository,
    Pages6WearRepository,
  ],
  exports: [
    Pages0WearService,
    Pages1WearService,
    Pages2WearService,
    Pages3WearService,
    Pages0WearRepository,
    Pages1WearRepository,
    Pages2WearRepository,
    Pages3WearRepository,
  ],
})
export class WearPagesModule {}
