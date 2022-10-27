import { Module } from '@nestjs/common';
import { FoodSitesService } from './food-sites.service';
import { FoodSitesResolver } from './food-sites.resolver';
import { FoodSitesRepository } from './food-sites.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Site, SiteFood } from '../entities/site.model';
import { SiteFoodSchema, SiteSchema } from '../entities/site.schema';
import { FoodPagesModule } from 'src/pages/food-pages/food-pages.module';

@Module({
  imports: [
    FoodPagesModule,
    MongooseModule.forFeature(
      [{ name: SiteFood.name, schema: SiteFoodSchema }],
      'sitesFoodDB',
    ),
  ],
  providers: [FoodSitesResolver, FoodSitesService, FoodSitesRepository],
})
export class FoodSitesModule {}
