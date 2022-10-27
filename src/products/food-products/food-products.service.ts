import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UpdateImage } from 'src/common/input/site.input';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { CreateFood, UpdateFood } from './dto/food.input';
import { FoodDocument } from './entities/food-product.schema';
import { MealProductsRepository } from './food-products.repository';

@Injectable()
export class FoodProductsService {
  constructor(private readonly mealRepository: MealProductsRepository) {}

  async create(input: CreateFood, type: string) {
    let data;
    switch (type) {
      case 'meal':
        data = await this.mealRepository.add(input, type);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }
  async update(id: string, input: UpdateFood, type: string) {
    let data;
    switch (type) {
      case 'meal':
        data = await this.mealRepository.update(id, input);
        break;
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
    input: UpdateImage[],
    type: string,
    uid: string,
  ) {
    let data;
    switch (type) {
      case 'meal':
        data = await this.mealRepository.updateImage(id, input, uid);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }
  async findFood(id: string, type: string) {
    let data;
    switch (type) {
      case 'meal':
        data = await this.mealRepository.findOne({ _id: id });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }

  findFoods(type: string) {
    let data;
    switch (type) {
      case 'meal':
        data = this.mealRepository.find({});
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  async findAllFoods() {
    const meals = await this.mealRepository.find({});

    return [...meals];
  }

  async findFoodsBySite(siteId: string, type: string) {
    let data;
    switch (type) {
      case 'meal':
        data = await this.mealRepository.find({ siteId: siteId });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  async findFoodsByParent(parentId: string, type: string) {
    let data;
    switch (type) {
      case 'meal':
        data = await this.mealRepository.find({ parentId: parentId });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  async findAllFoodsByParent(parentId: string) {
    const meals = await this.mealRepository.find({
      parentId: parentId,
    });

    return [...meals];
  }

  async deleteFood(id: string, type: string) {
    switch (type) {
      case 'meal':
        await this.mealRepository.deleteOne({ _id: id });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return id;
  }

  async deleteFoods(siteId: string, type: string) {
    switch (type) {
      case 'meal':
        await this.mealRepository.deleteMany({ siteId: siteId });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return 'deleted products';
  }
  async deleteFoodsById(ids: string[], type: string) {
    switch (type) {
      case 'meal':
        await this.mealRepository.deleteManyFoods(ids);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return ids;
  }

  findByParentId(parentId: string, type: string) {
    let data;
    switch (type) {
      case 'meal':
        data = this.mealRepository.find({ parentId: parentId });
        break;
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
    return this.mealRepository.find({ parentId: parentId });
  }

  findBySiteId(siteId: string, type: string) {
    let data;
    switch (type) {
      case 'meal':
        data = this.mealRepository.find({ siteId: siteId });
        break;
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
      case 'meal':
        data = this.mealRepository.All(pagination, siteId);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  private toModel({ _id, data, siteId, parentId }: FoodDocument) {
    return {
      _id: _id.toHexString(),
      data: data,
      siteId: siteId,
      parentId: parentId,
    };
  }
}
