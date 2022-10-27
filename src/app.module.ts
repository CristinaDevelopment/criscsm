import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
    CommonModule,
    FoodSitesModule,
    WearSitesModule,
    FoodPagesModule,
    WearPagesModule,
    HardwarePagesModule,
    FoodProductsModule,
    WearProductsModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
