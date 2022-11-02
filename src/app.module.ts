import { Module, ValidationPipe } from '@nestjs/common';
import { FoodSitesModule } from './sites/food-sites/food-sites.module';
import { WearSitesModule } from './sites/wear-sites/wear-sites.module';
import { FoodPagesModule } from './pages/food-pages/food-pages.module';
import { WearPagesModule } from './pages/wear-pages/wear-pages.module';
import { HardwarePagesModule } from './pages/hardware-pages/hardware-pages.module';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './config/common.module';
import { FoodProductsModule } from './products/food-products/food-products.module';
import { WearProductsModule } from './products/wear-products/wear-products.module';
import { UploadsModule } from './uploads/uploads.module';
import { MarketingSitesModule } from './sites/marketing-sites/marketing-sites.module';
import { MarketingPagesModule } from './pages/marketing-pages/marketing-pages.module';
import { UserMarketingModule } from './users/marketing-users/marketing-users.module';

@Module({
  imports: [
    CommonModule,
    FoodSitesModule,
    WearSitesModule,
    MarketingSitesModule,
    FoodPagesModule,
    MarketingPagesModule,
    WearPagesModule,
    HardwarePagesModule,
    FoodProductsModule,
    WearProductsModule,
    UploadsModule,
    UserMarketingModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
