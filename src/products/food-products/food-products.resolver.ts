import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FoodProductsService } from './food-products.service';
import { Food, ListFood } from './entities/food-product.model';
import { CreateFood, UpdateFood } from './dto/food.input';
import { UpdateImage } from 'src/common/input/site.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';

@Resolver(() => Food)
export class FoodProductsResolver {
  constructor(private readonly foodService: FoodProductsService) {}

  @Mutation(() => Food, { name: 'createProductFood' })
  create(@Args('input') input: CreateFood, @Args('type') type: string) {
    return this.foodService.create(input, type);
  }
  @Mutation(() => Food, { name: 'updateProductFood' })
  update(
    @Args('id') id: string,
    @Args('input') input: UpdateFood,
    @Args('type') type: string,
  ) {
    return this.foodService.update(id, input, type);
  }
  @Mutation(() => Food, { name: 'updateProductFoodImage' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage', { type: () => [UpdateImage] })
    inputImage: UpdateImage[],
    @Args('type') type: string,
    @Args('uid') uid: string,
  ) {
    return this.foodService.updateImage(id, inputImage, type, uid);
  }
  @Mutation(() => String, { name: 'deleteProductFood' })
  deleteFood(@Args('id') id: string, @Args('type') type: string) {
    return this.foodService.deleteFood(id, type);
  }

  @Mutation(() => String, { name: 'deleteProductsFoodBySite' })
  deleteFoods(@Args('siteId') siteId: string, @Args('type') type: string) {
    return this.foodService.deleteFoods(siteId, type);
  }
  @Mutation(() => [String], { name: 'deleteProductsFood' })
  deleteFoodsById(
    @Args('ids', { type: () => [String] }) ids: string[],
    @Args('type') type: string,
  ) {
    return this.foodService.deleteFoodsById(ids, type);
  }

  @Query(() => Food, { name: 'findProductFood' })
  findFood(@Args('id') id: string, @Args('type') type: string) {
    return this.foodService.findFood(id, type);
  }
  @Query(() => [Food], { name: 'findProductsFood' })
  findFoods(@Args('type') type: string) {
    return this.foodService.findFoods(type);
  }
  @Query(() => [Food], { name: 'findAllProductsFood' })
  findAllFoods() {
    return this.foodService.findAllFoods();
  }
  @Query(() => [Food], { name: 'findProductsFoodByParent' })
  findFoodsByParent(
    @Args('parentId') parentId: string,
    @Args('type') type: string,
  ) {
    return this.foodService.findFoodsByParent(parentId, type);
  }
  @Query(() => [Food], { name: 'findAllProductsFoodByParent' })
  findAllFoodsByParent(@Args('parentId') parentId: string) {
    return this.foodService.findAllFoodsByParent(parentId);
  }

  @Query(() => ListFood, { name: 'listProductFoodWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('type') type: string,
    @Args('siteId') siteId: string,
  ): Promise<ListFood> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.foodService.all(
      {
        limit,
        offset,
      },
      type,
      siteId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}
