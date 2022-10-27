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
import { Pages0FoodService, Pages1FoodService } from '../service';
import { ListPage, Page0Food, Page1Food } from '../../entities/food-page.model';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { UpdateImage } from 'src/common/input/site.input';

@Resolver(() => Page0Food)
export class Pages0FoodResolver {
  constructor(
    private readonly pages0Service: Pages0FoodService,
    private readonly pages1Service: Pages1FoodService,
  ) {}

  @Mutation(() => Page0Food, { name: 'createPage0Food' })
  createPage(@Args('input') input: CreatePage) {
    return this.pages0Service.create(input);
  }
  @Mutation(() => Page0Food, { name: 'updatePage0Food' })
  updatePage(
    @Args('id') id: string,
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.update(id, input);
  }

  @Mutation(() => Page0Food, { name: 'updateImagePage0Food' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.pages0Service.updateImage(id, inputImage, uid);
  }

  @Mutation(() => String, { name: 'deletePage0Food' })
  deletePage(@Args('id') id: string) {
    return this.pages0Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'deletePages0Food' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages0Service.deletePagesById(ids);
  }

  @Query(() => Page0Food, { name: 'findPage0Food' })
  findPage(@Args('id') id: string) {
    return this.pages0Service.findPage(id);
  }

  @Query(() => [Page0Food], { name: 'findPages0Food' })
  findPages() {
    return this.pages0Service.findPages();
  }

  @Query(() => [Page0Food], { name: 'findPages0FoodByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'listPages0FoodWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ): Promise<ListPage> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.pages0Service.all(
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

  @ResolveField('page', () => [Page1Food], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page0Food) {
    return this.pages1Service.findPagesByParentId(_id.toString());
  }
}
