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
import { Pages2WearService, Pages3WearService } from '../service';

import { ListPage, Page2Wear, Page3Wear } from '../../entities/food-page.model';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { GetPage } from '../../dto/food-page.args';
import { UpdateImage } from 'src/common/input/site.input';

@Resolver(() => Page2Wear)
export class Pages2WearResolver {
  constructor(
    private readonly pages2Service: Pages2WearService,
    private readonly pages3Service: Pages3WearService,
  ) {}

  @Mutation(() => Page2Wear, { name: 'createPage2Wear' })
  createPage(@Args('input') input: CreatePage) {
    return this.pages2Service.create(input);
  }
  @Mutation(() => Page2Wear, { name: 'updatePage2Wear' })
  updatePage(
    @Args('id') id: string,
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.update(id, input);
  }

  @Mutation(() => Page2Wear, { name: 'updateImagePage2Wear' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.pages2Service.updateImage(id, inputImage, uid);
  }

  @Mutation(() => String, { name: 'deletePage2Wear' })
  deletePage(@Args('id') id: string) {
    return this.pages2Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'deletePages2Wear' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages2Service.deletePagesById(ids);
  }

  @Query(() => Page2Wear, { name: 'findPage2Wear' })
  findPage(@Args('id') id: string) {
    return this.pages2Service.findPage(id);
  }

  @Query(() => [Page2Wear], { name: 'findPages2Wear' })
  findPages() {
    return this.pages2Service.findPages();
  }

  @Query(() => [Page2Wear], { name: 'findPages2WearByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'listPages2WearWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ): Promise<ListPage> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.pages2Service.all(
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

  @ResolveField('page', () => [Page3Wear], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page2Wear) {
    // console.log(_id);
    return this.pages3Service.findPagesByParentId(_id.toString());
  }
}
