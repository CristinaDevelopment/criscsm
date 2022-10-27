import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { UpdateImage } from 'src/common/input/site.input';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { CreateWear, UpdateWear } from './dto/wear.input';
import { WearDocument } from './entities/wear.schema';
import {
  ProductsRepositoryBackpack,
  ProductsRepositoryClothing,
  ProductsRepositoryHandbag,
} from './wear-products.repository';

@Injectable()
export class WearProductsService {
  constructor(
    private readonly productRepositoryClothing: ProductsRepositoryClothing,
    private readonly productRepositoryBackpack: ProductsRepositoryBackpack,
    private readonly productRepositoryHandbag: ProductsRepositoryHandbag, // private readonly productRepositoryEngine: ProductsRepositoryEngine,
  ) {}

  async create(input: CreateWear, type: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = await this.productRepositoryClothing.add(input, type);
        break;
      case 'backpack':
        data = await this.productRepositoryBackpack.add(input, type);
        break;
      case 'handbag':
        data = await this.productRepositoryHandbag.add(input, type);
        break;
      // case 'furniture':
      //   data = await this.productRepositoryFurniture.add(input, type);
      //   break;
      // case 'hardware-store':
      //   data = await this.productRepositoryHardwareStore.add(input, type);
      //   break;
      // case 'glasses':
      //   data = await this.productRepositoryGlasses.add(input, type);
      //   break;
      // case 'engine':
      //   data = await this.productRepositoryEngine.add(input, type);
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }
  async update(id: string, input: UpdateWear, type: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = await this.productRepositoryClothing.update(id, input);
        break;
      case 'backpack':
        data = await this.productRepositoryBackpack.update(id, input);
        break;
      case 'handbag':
        data = await this.productRepositoryHandbag.update(id, input);
        break;
      // case 'furniture':
      //   data = await this.productRepositoryFurniture.update(id, input);
      //   break;
      // case 'hardware-store':
      //   data = await this.productRepositoryHardwareStore.update(id, input);
      //   break;
      // case 'glasses':
      //   data = await this.productRepositoryGlasses.update(id, input);
      //   break;
      // case 'engine':
      //   data = await this.productRepositoryEngine.update(id, input);
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }

  async updateImage(
    id: string,
    inputImage: UpdateImage[],
    type: string,
    uid: string,
  ) {
    let data;
    switch (type) {
      case 'clothing':
        data = await this.productRepositoryClothing.updateImage(
          id,
          inputImage,
          uid,
        );
        break;
      case 'backpack':
        data = await this.productRepositoryBackpack.updateImage(
          id,
          inputImage,
          uid,
        );
        break;
      case 'handbag':
        data = await this.productRepositoryHandbag.updateImage(
          id,
          inputImage,
          uid,
        );
        break;
      // case 'furniture':
      //   data = await this.productRepositoryFurniture.updateImage(
      //     id,
      //     input,
      //     uid,
      //   );
      //   break;
      // case 'hardware-store':
      //   data = await this.productRepositoryHardwareStore.updateImage(
      //     id,
      //     input,
      //     uid,
      //   );
      //   break;
      // case 'glasses':
      //   data = await this.productRepositoryGlasses.updateImage(id, input, uid);
      //   break;
      // case 'engine':
      //   data = await this.productRepositoryEngine.updateImage(id, input, uid);
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }
  async findProduct(id: string, type: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = await this.productRepositoryClothing.findOne({ _id: id });
        break;
      case 'backpack':
        data = await this.productRepositoryBackpack.findOne({ _id: id });
        break;
      case 'handbag':
        data = await this.productRepositoryHandbag.findOne({ _id: id });
        break;
      // case 'furniture':
      //   data = await this.productRepositoryFurniture.findOne({ _id: id });
      //   break;
      // case 'hardware-store':
      //   data = await this.productRepositoryHardwareStore.findOne({ _id: id });
      //   break;
      // case 'glasses':
      //   data = await this.productRepositoryGlasses.findOne({ _id: id });
      //   break;
      // case 'engine':
      //   data = await this.productRepositoryEngine.findOne({ _id: id });
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }

  findProducts(type: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = this.productRepositoryClothing.find({});
        break;
      case 'backpack':
        data = this.productRepositoryBackpack.find({});
        break;
      case 'handbag':
        data = this.productRepositoryHandbag.find({});
        break;
      // case 'furniture':
      //   data = this.productRepositoryFurniture.find({});
      //   break;
      // case 'hardware-store':
      //   data = this.productRepositoryHardwareStore.find({});
      //   break;
      // case 'glasses':
      //   data = this.productRepositoryGlasses.find({});
      //   break;
      // case 'engine':
      //   data = this.productRepositoryEngine.find({});
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  // findProductsClothing() {
  //   return this.productRepositoryClothing.find({});
  // }
  // findProductsFurniture() {
  //   return this.productRepositoryFurniture.find({});
  // }

  async findAllProducts() {
    const clothings = await this.productRepositoryClothing.find({});
    const handbags = await this.productRepositoryHandbag.find({});
    const backpacks = await this.productRepositoryBackpack.find({});
    // const furnituries = await this.productRepositoryFurniture.find({});
    // const hardwareStore = await this.productRepositoryHardwareStore.find({});
    // const glasses = await this.productRepositoryGlasses.find({});
    // const enginies = await this.productRepositoryEngine.find({});

    return [
      ...clothings,
      // ...furnituries,
      ...handbags,
      ...backpacks,
      // ...hardwareStore,
      // ...glasses,
      // ...enginies,
    ];
  }

  async findProductsBySite(siteId: string, type: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = await this.productRepositoryClothing.find({ siteId: siteId });
        break;
      case 'backpack':
        data = await this.productRepositoryBackpack.find({ siteId: siteId });
        break;
      case 'handbag':
        data = await this.productRepositoryHandbag.find({ siteId: siteId });
        break;
      // case 'furniture':
      //   data = await this.productRepositoryFurniture.find({ site: siteId });
      //   break;
      // case 'hardware-store':
      //   data = await this.productRepositoryHardwareStore.find({ site: siteId });
      //   break;
      // case 'glasses':
      //   data = await this.productRepositoryGlasses.find({ site: siteId });
      //   break;
      // case 'engine':
      //   data = await this.productRepositoryEngine.find({ site: siteId });
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  async findProductsByParent(parentId: string, type: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = await this.productRepositoryClothing.find({
          parentId: parentId,
        });
        break;
      case 'backpack':
        data = await this.productRepositoryBackpack.find({
          parentId: parentId,
        });
        break;
      case 'handbag':
        data = await this.productRepositoryHandbag.find({ parentId: parentId });
        break;
      // case 'furniture':
      //   data = await this.productRepositoryFurniture.find({ parent: parentId });
      //   break;
      // case 'hardware-store':
      //   data = await this.productRepositoryHardwareStore.find({
      //     parent: parentId,
      //   });
      //   break;
      // case 'glasses':
      //   data = await this.productRepositoryGlasses.find({ parent: parentId });
      //   break;
      // case 'engine':
      //   data = await this.productRepositoryEngine.find({ parent: parentId });
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  async findAllProductsByParent(parentId: string) {
    const clothings = await this.productRepositoryClothing.find({
      parentId: parentId,
    });
    const handbags = await this.productRepositoryHandbag.find({
      parentId: parentId,
    });
    const backpacks = await this.productRepositoryBackpack.find({
      parentId: parentId,
    });
    // const hardwareStores = await this.productRepositoryHardwareStore.find({
    //   parent: parentId,
    // });
    // const glasses = await this.productRepositoryGlasses.find({
    //   parent: parentId,
    // });
    // const enginies = await this.productRepositoryEngine.find({
    //   parent: parentId,
    // });

    return [
      ...clothings,
      ...handbags,
      ...backpacks,
      // ...hardwareStores,
      // ...glasses,
      // ...enginies,
    ];
  }

  async deleteProduct(id: string, type: string) {
    switch (type) {
      case 'clothing':
        await this.productRepositoryClothing.deleteOne({ _id: id });
        break;
      case 'backpack':
        await this.productRepositoryBackpack.deleteOne({ _id: id });
        break;
      case 'handbag':
        await this.productRepositoryHandbag.deleteOne({ _id: id });
        break;
      // case 'furniture':
      //   await this.productRepositoryFurniture.deleteOne({ _id: id });
      //   break;
      // case 'hardware-store':
      //   await this.productRepositoryHardwareStore.deleteOne({ _id: id });
      //   break;
      // case 'glasses':
      //   await this.productRepositoryGlasses.deleteOne({ _id: id });
      //   break;
      // case 'engine':
      //   await this.productRepositoryEngine.deleteOne({ _id: id });
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return id;
  }

  async deleteProducts(siteId: string, type: string) {
    switch (type) {
      case 'clothing':
        await this.productRepositoryClothing.deleteMany({ siteId: siteId });
        break;
      case 'backpack':
        await this.productRepositoryBackpack.deleteMany({ siteId: siteId });
        break;
      case 'handbag':
        await this.productRepositoryHandbag.deleteMany({ siteId: siteId });
        break;
      // case 'furniture':
      //   await this.productRepositoryFurniture.deleteMany({ site: siteId });
      //   break;
      // case 'hardware-store':
      //   await this.productRepositoryHardwareStore.deleteMany({ site: siteId });
      //   break;
      // case 'glasses':
      //   await this.productRepositoryGlasses.deleteMany({ site: siteId });
      //   break;
      // case 'engine':
      //   await this.productRepositoryEngine.deleteMany({ site: siteId });
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return 'deleted products';
  }
  async deleteProductsById(ids: string[], type: string) {
    switch (type) {
      case 'clothing':
        await this.productRepositoryClothing.deleteManyProducts(ids);
        break;
      case 'backpack':
        await this.productRepositoryBackpack.deleteManyProducts(ids);
        break;
      case 'handbag':
        await this.productRepositoryHandbag.deleteManyProducts(ids);
        break;
      // case 'furniture':
      //   await this.productRepositoryFurniture.deleteManyProducts(ids);
      //   break;
      // case 'hardware-store':
      //   await this.productRepositoryHardwareStore.deleteManyProducts(ids);
      //   break;
      // case 'glasses':
      //   await this.productRepositoryGlasses.deleteManyProducts(ids);
      //   break;
      // case 'engine':
      //   await this.productRepositoryEngine.deleteManyProducts(ids);
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return ids;
  }

  findByParentId(parentId: string, type: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = this.productRepositoryClothing.find({ parentId: parentId });
        break;
      case 'backpack':
        data = this.productRepositoryBackpack.find({ parentId: parentId });
        break;
      case 'handbag':
        data = this.productRepositoryHandbag.find({ parentId: parentId });
        break;
      // case 'furniture':
      //   data = this.productRepositoryFurniture.find({ parent: parentUi });
      //   break;
      // case 'hardware-store':
      //   data = this.productRepositoryHardwareStore.find({ parent: parentUi });
      //   break;
      // case 'glasses':
      //   data = this.productRepositoryGlasses.find({ parent: parentUi });
      //   break;
      // case 'engine':
      //   data = this.productRepositoryEngine.find({ parent: parentUi });
      //   break;
      default:
        data = [];
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }

  findByParentClothing(parentId: string) {
    return this.productRepositoryClothing.find({ parentId: parentId });
  }
  findByParentHandbag(parentId: string) {
    return this.productRepositoryHandbag.find({ parentId: parentId });
  }
  findByParentBackpack(parentId: string) {
    return this.productRepositoryBackpack.find({ parentId: parentId });
  }
  // findByParentFurniture(pageUi) {
  //   return this.productRepositoryFurniture.find({ parent: pageUi });
  // }
  // findByParentHardwareStore(pageUi) {
  //   return this.productRepositoryHardwareStore.find({ parent: pageUi });
  // }
  // findByParentGlasses(pageUi) {
  //   return this.productRepositoryGlasses.find({ parent: pageUi });
  // }
  // findByParentEngine(pageUi) {
  //   return this.productRepositoryEngine.find({ parent: pageUi });
  // }

  findBySiteId(siteId: string, type: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = this.productRepositoryClothing.find({ siteId: siteId });
        break;
      case 'backpack':
        data = this.productRepositoryBackpack.find({ siteId: siteId });
        break;
      case 'handbag':
        data = this.productRepositoryHandbag.find({ siteId: siteId });
        break;
      // case 'furniture':
      //   data = this.productRepositoryFurniture.find({ site: siteId });
      //   break;
      // case 'hardware-store':
      //   data = this.productRepositoryHardwareStore.find({ site: siteId });
      //   break;
      // case 'glasses':
      //   data = this.productRepositoryGlasses.find({ site: siteId });
      //   break;
      // case 'engine':
      //   data = this.productRepositoryEngine.find({ site: siteId });
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }

    return data;
  }

  all(pagination: ListInput, type: string, siteId: string) {
    let data;
    switch (type) {
      case 'clothing':
        data = this.productRepositoryClothing.All(pagination, siteId);
        break;
      case 'backpack':
        data = this.productRepositoryBackpack.All(pagination, siteId);
        break;
      case 'handbag':
        data = this.productRepositoryHandbag.All(pagination, siteId);
        break;
      // case 'furniture':
      //   data = this.productRepositoryFurniture.All(pagination, siteId);
      //   break;
      // case 'hardware-store':
      //   data = this.productRepositoryHardwareStore.All(pagination, siteId);
      //   break;
      // case 'glasses':
      //   data = this.productRepositoryGlasses.All(pagination, siteId);
      //   break;
      // case 'engine':
      //   data = this.productRepositoryEngine.All(pagination, siteId);
      //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  private toModel({ _id, data, siteId, parentId }: WearDocument) {
    return {
      _id: _id.toHexString(),
      data: data,
      siteId: siteId,
      parentId: parentId,
    };
  }
}
