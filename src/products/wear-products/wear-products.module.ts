import { Module } from '@nestjs/common';
import { WearProductsService } from './wear-products.service';
import { WearProductsResolver } from './wear-products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Backpack, Clothing, Handbag } from './entities/wear.model';
import { ClothingSchema } from './entities/wear.schema';
import {
  ProductsRepositoryBackpack,
  ProductsRepositoryClothing,
  ProductsRepositoryHandbag,
} from './wear-products.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Clothing.name, schema: ClothingSchema },
        { name: Backpack.name, schema: ClothingSchema },
        { name: Handbag.name, schema: ClothingSchema },
      ],
      'wearsDB',
    ),
  ],
  providers: [
    WearProductsResolver,
    WearProductsService,
    ProductsRepositoryClothing,
    ProductsRepositoryHandbag,
    ProductsRepositoryBackpack,
  ],
  exports: [WearProductsService],
})
export class WearProductsModule {}
