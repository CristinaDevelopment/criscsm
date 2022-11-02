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
import { Pages1MarketingService, Pages2MarketingService } from '../service';

import { ListPage, Page2Marketing, Page1Marketing } from '../../entities/food-page.model';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { GetPage } from '../../dto/food-page.args';
import { UpdateImage } from 'src/common/input/site.input';

@Resolver(() => Page1Marketing)
export class Pages1MarketingResolver {
  constructor(
    private readonly pages1Service: Pages1MarketingService,
    private readonly pages2Service: Pages2MarketingService,
  ) {}

  @Mutation(() => Page1Marketing, { name: 'createPage1Marketing' })
  createPage(@Args('input') input: CreatePage) {
    return this.pages1Service.create(input);
  }
  @Mutation(() => Page1Marketing, { name: 'updatePage1Marketing' })
  updatePage(
    @Args('id') id: string,
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.update(id, input);
  }

  @Mutation(() => Page1Marketing, { name: 'updateImagePage1Marketing' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.pages1Service.updateImage(id, inputImage, uid);
  }

  @Mutation(() => String, { name: 'deletePage1Marketing' })
  deletePage(@Args('id') id: string) {
    return this.pages1Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'deletePages1Marketing' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages1Service.deletePagesById(ids);
  }

  @Query(() => Page1Marketing, { name: 'findPage1Marketing' })
  findPage(@Args('id') id: string) {
    return this.pages1Service.findPage(id);
  }

  @Query(() => [Page1Marketing], { name: 'findPages1Marketing' })
  findPages() {
    return this.pages1Service.findPages();
  }

  @Query(() => [Page1Marketing], { name: 'findPages1MarketingByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages1Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'listPages1MarketingWithCursor' })
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

  @ResolveField('page', () => [Page2Marketing], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page1Marketing) {
    // console.log(_id);

    return this.pages2Service.findPagesByParentId(_id.toString());
  }
}
