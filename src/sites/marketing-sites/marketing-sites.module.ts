import { Module } from '@nestjs/common';
import { MarketingSitesService } from './marketing-sites.service';
import { MarketingSitesResolver } from './marketing-sites.resolver';
import { MarketingSitesRepository } from './marketing-sites.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteMarketing } from '../entities/site.model';
import { SiteMarketingSchema } from '../entities/site.schema';
import { MarketingPagesModule } from 'src/pages/marketing-pages/marketing-pages.module';

@Module({
  imports: [
    MarketingPagesModule,
    MongooseModule.forFeature(
      [{ name: SiteMarketing.name, schema: SiteMarketingSchema }],
      'sitesMarketingDB',
    ),
  ],
  providers: [
    MarketingSitesResolver,
    MarketingSitesService,
    MarketingSitesRepository,
  ],
})
export class MarketingSitesModule {}
