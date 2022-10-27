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
import { Pages2FoodService, Pages3FoodService } from '../service';

import { ListPage, Page2Food, Page3Food } from '../../entities/food-page.model';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { UpdateImage } from 'src/common/input/site.input';

@Resolver(() => Page2Food)
export class Pages2FoodResolver {
  constructor(
    private readonly pages2Service: Pages2FoodService,
    private readonly pages3Service: Pages3FoodService,
  ) {}

  @Mutation(() => Page2Food, { name: 'createPage2Food' })
  createPage(@Args('input') input: CreatePage) {
    return this.pages2Service.create(input);
  }
  @Mutation(() => Page2Food, { name: 'updatePage2Food' })
  updatePage(
    @Args('id') id: string,
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.update(id, input);
  }

  @Mutation(() => Page2Food, { name: 'updateImagePage2Food' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.pages2Service.updateImage(id, inputImage, uid);
  }

  @Mutation(() => String, { name: 'deletePage2Food' })
  deletePage(@Args('id') id: string) {
    return this.pages2Service.deletePage(id);
  }

  @Mutation(() => [String], { name: 'deletePages2Food' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.pages2Service.deletePagesById(ids);
  }

  @Query(() => Page2Food, { name: 'findPage2Food' })
  findPage(@Args('id') id: string) {
    return this.pages2Service.findPage(id);
  }

  @Query(() => [Page2Food], { name: 'findPages2Food' })
  findPages() {
    return this.pages2Service.findPages();
  }

  @Query(() => [Page2Food], { name: 'findPages2FoodByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.pages2Service.findPagesByParentId(parentId);
  }

  @Query(() => ListPage, { name: 'listPages2FoodWithCursor' })
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

  @ResolveField('page', () => [Page3Food], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page2Food) {
    // console.log(_id);
    return this.pages3Service.findPagesByParentId(_id.toString());
  }
}
