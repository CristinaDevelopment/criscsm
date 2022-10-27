import { Module } from '@nestjs/common';
import { WearSitesService } from './wear-sites.service';
import { WearSitesResolver } from './wear-sites.resolver';
import { WearSitesRepository } from './wear-sites.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteWear } from '../entities/site.model';
import { SiteWearSchema } from '../entities/site.schema';
import { WearPagesModule } from 'src/pages/wear-pages/wear-pages.module';

@Module({
  imports: [
    WearPagesModule,
    MongooseModule.forFeature(
      [{ name: SiteWear.name, schema: SiteWearSchema }],
      'sitesWearDB',
    ),
  ],
  providers: [WearSitesResolver, WearSitesService, WearSitesRepository],
})
export class WearSitesModule {}
