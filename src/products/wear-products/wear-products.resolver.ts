import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CreateWear, UpdateWear } from './dto/wear.input';
import { ListWear, Wear } from './entities/wear.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { WearProductsService } from './wear-products.service';
import { UpdateImage } from 'src/common/input/site.input';
@Resolver(() => Wear)
export class WearProductsResolver {
  constructor(private readonly productService: WearProductsService) {}

  @Mutation(() => Wear, { name: 'createProductWear' })
  create(@Args('input') input: CreateWear, @Args('type') type: string) {
    return this.productService.create(input, type);
  }
  @Mutation(() => Wear, { name: 'updateProductWear' })
  update(
    @Args('id') id: string,
    @Args('input') input: UpdateWear,
    @Args('type') type: string,
  ) {
    return this.productService.update(id, input, type);
  }
  @Mutation(() => Wear, { name: 'updateProductWearImage' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage', { type: () => [UpdateImage] })
    inputImage: UpdateImage[],
    @Args('type') type: string,
    @Args('uid') uid: string,
  ) {
    return this.productService.updateImage(id, inputImage, type, uid);
  }
  @Mutation(() => String, { name: 'deleteProductWear' })
  deleteProduct(@Args('id') id: string, @Args('type') type: string) {
    return this.productService.deleteProduct(id, type);
  }

  @Mutation(() => String, { name: 'deleteProductsWearBySite' })
  deleteProducts(@Args('siteId') siteId: string, @Args('type') type: string) {
    return this.productService.deleteProducts(siteId, type);
  }
  @Mutation(() => [String], { name: 'deleteProductsWear' })
  deleteProductsById(
    @Args('ids', { type: () => [String] }) ids: string[],
    @Args('type') type: string,
  ) {
    return this.productService.deleteProductsById(ids, type);
  }

  @Query(() => Wear, { name: 'findProductWear' })
  findProduct(@Args('id') id: string, @Args('type') type: string) {
    return this.productService.findProduct(id, type);
  }
  @Query(() => [Wear], { name: 'findProductsWear' })
  findProducts(@Args('type') type: string) {
    return this.productService.findProducts(type);
  }
  @Query(() => [Wear], { name: 'findAllProductsWear' })
  findAllProducts() {
    return this.productService.findAllProducts();
  }
  @Query(() => [Wear], { name: 'findProductsWearByParent' })
  findProductsByParent(
    @Args('parentId') parentId: string,
    @Args('type') type: string,
  ) {
    return this.productService.findProductsByParent(parentId, type);
  }
  @Query(() => [Wear], { name: 'findAllProductsWearByParent' })
  findAllProductsByParent(@Args('parentId') parentId: string) {
    return this.productService.findAllProductsByParent(parentId);
  }

  @Query(() => ListWear, { name: 'listProductWearWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('type') type: string,
    @Args('siteId') siteId: string,
  ): Promise<ListWear> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.productService.all(
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
