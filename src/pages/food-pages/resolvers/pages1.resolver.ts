import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { Pages1FoodService, Pages2FoodService } from '../service';

import { ListPage, Page1Food, Page2Food } from '../../entities/food-page.model';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { UpdateImage } from 'src/common/input/site.input';
import { FoodProductsService } from 'src/products/food-products/food-products.service';
import { Meal } from 'src/products/food-products/entities/food-product.model';

@Resolver(() => Page1Food)
export class Pages1FoodResolver {
  constructor(
    private readonly pages1Service: Pages1FoodService,
    private readonly pages2Service: Pages2FoodService,
    private readonly productsFoodService: FoodProductsService,
  ) {}

  @Mutation(() => Page1Food, { name: 'createPage1Food' })
  createPage(@Args('input') input: CreatePage) {
    return this.pages1Service.create(input);
  }
  @Mutation(() => Page1Food, { name: 'updatePage1Food' })
  updatePage(
    @Args('id') id: string,
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.update(id, input);
  }

  @Mutation(() => Page1Food, { name: 'updateImagePage1Food' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.pages1Service.updateImage(id, inputImage, uid);
  }

  @Mutation(() => String, { name: 'deletePage1Food' })
  deletePage(@Args('id') id: string) {
    return this.pages1Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'deletePages1Food' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages1Service.deletePagesById(ids);
  }

  @Query(() => Page1Food, { name: 'findPage1Food' })
  findPage(@Args('id') id: string) {
    return this.pages1Service.findPage(id);
  }

  @Query(() => [Page1Food], { name: 'findPages1Food' })
  findPages() {
    return this.pages1Service.findPages();
  }

  @Query(() => [Page1Food], { name: 'findPages1FoodByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'listPages1FoodWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ): Promise<ListPage> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.pages1Service.all(
      {
        limit,
        offset,
      },
      parentId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('page', () => [Page2Food], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page1Food) {
    return this.pages2Service.findPagesByParentId(_id.toString());
  }
  @ResolveField('product', () => [Meal], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id }: Page1Food) {
    return this.productsFoodService.findAllFoodsByParent(_id.toString());
  }
}
