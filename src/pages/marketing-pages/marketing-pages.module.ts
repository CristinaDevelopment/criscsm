import { Module } from '@nestjs/common';
import {
  Page0Marketing,
  Page1Marketing,
  Page2Marketing,
  Page3Marketing,
  Page4Marketing,
  Page5Marketing,
  Page6Marketing,
} from '../entities/food-page.model';
import {
  Page0MarketingSchema,
  Page1MarketingSchema,
  Page2MarketingSchema,
  Page3MarketingSchema,
  Page4MarketingSchema,
  Page5MarketingSchema,
  Page6MarketingSchema,
} from '../entities/food-page.schema';

import {
  Pages0MarketingService,
  Pages1MarketingService,
  Pages2MarketingService,
  Pages3MarketingService,
  Pages4MarketingService,
  Pages5MarketingService,
  Pages6MarketingService,
} from './service';
import {
  Pages0MarketingResolver,
  Pages1MarketingResolver,
  Pages2MarketingResolver,
} from './resolvers';
import {
  Pages0MarketingRepository,
  Pages1MarketingRepository,
  Pages2MarketingRepository,
  Pages3MarketingRepository,
  Pages4MarketingRepository,
  Pages5MarketingRepository,
  Pages6MarketingRepository,
} from './marketing-pages.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Page0Marketing.name, schema: Page0MarketingSchema },
        { name: Page1Marketing.name, schema: Page1MarketingSchema },
        { name: Page2Marketing.name, schema: Page2MarketingSchema },
        { name: Page3Marketing.name, schema: Page3MarketingSchema },
        { name: Page4Marketing.name, schema: Page4MarketingSchema },
        { name: Page5Marketing.name, schema: Page5MarketingSchema },
        { name: Page6Marketing.name, schema: Page6MarketingSchema },
      ],
      'pagesMarketingDB',
    ),
  ],
  providers: [
    Pages0MarketingService,
    Pages1MarketingService,
    Pages2MarketingService,
    Pages3MarketingService,
    Pages4MarketingService,
    Pages5MarketingService,
    Pages6MarketingService,
    Pages0MarketingResolver,
    Pages1MarketingResolver,
    Pages2MarketingResolver,
    Pages0MarketingRepository,
    Pages1MarketingRepository,
    Pages2MarketingRepository,
    Pages3MarketingRepository,
    Pages4MarketingRepository,
    Pages5MarketingRepository,
    Pages6MarketingRepository,
  ],
  exports: [
    Pages0MarketingService,
    Pages1MarketingService,
    Pages2MarketingService,
    Pages3MarketingService,
    Pages0MarketingRepository,
    Pages1MarketingRepository,
    Pages2MarketingRepository,
    Pages3MarketingRepository,
  ],
})
export class MarketingPagesModule {}
