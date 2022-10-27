import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryProduct } from 'src/common/abstract';
import {
  Backpack,
  Clothing,
  Engine,
  Furniture,
  Glasses,
  Handbag,
  HardwareStore,
} from './entities/wear.model';
import { WearDocument } from './entities/wear.schema';

@Injectable()
export class ProductsRepositoryClothing extends AbstractRepositoryProduct<WearDocument> {
  protected readonly logger = new Logger(ProductsRepositoryClothing.name);
  constructor(
    @InjectModel(Clothing.name, 'wearsDB')
    productModelClothing: Model<WearDocument>,
  ) {
    super(productModelClothing);
  }
}
@Injectable()
export class ProductsRepositoryBackpack extends AbstractRepositoryProduct<WearDocument> {
  protected readonly logger = new Logger(ProductsRepositoryBackpack.name);
  constructor(
    @InjectModel(Backpack.name, 'wearsDB')
    productModelBackpack: Model<WearDocument>,
  ) {
    super(productModelBackpack);
  }
}
@Injectable()
export class ProductsRepositoryHandbag extends AbstractRepositoryProduct<WearDocument> {
  protected readonly logger = new Logger(ProductsRepositoryHandbag.name);
  constructor(
    @InjectModel(Handbag.name, 'wearsDB')
    productModelHandbag: Model<WearDocument>,
  ) {
    super(productModelHandbag);
  }
}
// @Injectable()
// export class ProductsRepositoryFurniture extends AbstractRepositoryProduct<ProductDocument> {
//   protected readonly logger = new Logger(ProductsRepositoryFurniture.name);
//   constructor(
//     @InjectModel(Furniture.name, 'furnituriesDB')
//     productModel: Model<ProductDocument>,
//   ) {
//     super(productModel);
//   }
// }
// @Injectable()
// export class ProductsRepositoryHardwareStore extends AbstractRepositoryProduct<ProductDocument> {
//   protected readonly logger = new Logger(ProductsRepositoryHardwareStore.name);
//   constructor(
//     @InjectModel(HardwareStore.name, 'toolsDB')
//     productModel: Model<ProductDocument>,
//   ) {
//     super(productModel);
//   }
// }
// @Injectable()
// export class ProductsRepositoryGlasses extends AbstractRepositoryProduct<ProductDocument> {
//   protected readonly logger = new Logger(ProductsRepositoryGlasses.name);
//   constructor(
//     @InjectModel(Glasses.name, 'glassesDB')
//     productModel: Model<ProductDocument>,
//   ) {
//     super(productModel);
//   }
// }
// @Injectable()
// export class ProductsRepositoryEngine extends AbstractRepositoryProduct<ProductDocument> {
//   protected readonly logger = new Logger(ProductsRepositoryEngine.name);
//   constructor(
//     @InjectModel(Engine.name, 'enginiesDB')
//     productModel: Model<ProductDocument>,
//   ) {
//     super(productModel);
//   }
// }
