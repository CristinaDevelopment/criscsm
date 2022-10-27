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
import { Pages0WearService, Pages1WearService } from '../service';
import { ListPage, Page0Wear, Page1Wear } from '../../entities/food-page.model';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { UpdateImage } from 'src/common/input/site.input';

@Resolver(() => Page0Wear)
export class Pages0WearResolver {
  constructor(
    private readonly pages0Service: Pages0WearService,
    private readonly pages1Service: Pages1WearService,
  ) {}

  @Mutation(() => Page0Wear, { name: 'createPage0Wear' })
  createPage(@Args('input') input: CreatePage) {
    return this.pages0Service.create(input);
  }
  @Mutation(() => Page0Wear, { name: 'updatePage0Wear' })
  updatePage(
    @Args('id') id: string,
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.update(id, input);
  }

  @Mutation(() => Page0Wear, { name: 'updateImagePage0Wear' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.pages0Service.updateImage(id, inputImage, uid);
  }

  @Mutation(() => String, { name: 'deletePage0Wear' })
  deletePage(@Args('id') id: string) {
    return this.pages0Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'deletePages0Wear' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages0Service.deletePagesById(ids);
  }

  @Query(() => Page0Wear, { name: 'findPage0Wear' })
  findPage(@Args('id') id: string) {
    return this.pages0Service.findPage(id);
  }

  @Query(() => [Page0Wear], { name: 'findPages0Wear' })
  findPages() {
    return this.pages0Service.findPages();
  }

  @Query(() => [Page0Wear], { name: 'findPages0WearByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'listPages0WearWithCursor' })
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

  @ResolveField('page', () => [Page1Wear], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page0Wear) {
    return this.pages1Service.findPagesByParentId(_id.toString());
  }
}
