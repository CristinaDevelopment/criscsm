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
import { Pages0MarketingService, Pages1MarketingService } from '../service';
import { ListPage, Page0Marketing, Page1Marketing } from '../../entities/food-page.model';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { UpdateImage } from 'src/common/input/site.input';

@Resolver(() => Page0Marketing)
export class Pages0MarketingResolver {
  constructor(
    private readonly pages0Service: Pages0MarketingService,
    private readonly pages1Service: Pages1MarketingService,
  ) {}

  @Mutation(() => Page0Marketing, { name: 'createPage0Marketing' })
  createPage(@Args('input') input: CreatePage) {
    return this.pages0Service.create(input);
  }
  @Mutation(() => Page0Marketing, { name: 'updatePage0Marketing' })
  updatePage(
    @Args('id') id: string,
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.update(id, input);
  }

  @Mutation(() => Page0Marketing, { name: 'updateImagePage0Marketing' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.pages0Service.updateImage(id, inputImage, uid);
  }

  @Mutation(() => String, { name: 'deletePage0Marketing' })
  deletePage(@Args('id') id: string) {
    return this.pages0Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'deletePages0Marketing' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages0Service.deletePagesById(ids);
  }

  @Query(() => Page0Marketing, { name: 'findPage0Marketing' })
  findPage(@Args('id') id: string) {
    return this.pages0Service.findPage(id);
  }

  @Query(() => [Page0Marketing], { name: 'findPages0Marketing' })
  findPages() {
    return this.pages0Service.findPages();
  }

  @Query(() => [Page0Marketing], { name: 'findPages0MarketingByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages0Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'listPages0MarketingWithCursor' })
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

  @ResolveField('page', () => [Page1Marketing], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page0Marketing) {
    return this.pages1Service.findPagesByParentId(_id.toString());
  }
}
