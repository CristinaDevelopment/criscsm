import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { GetSite } from 'src/common/args/site.args';
import {
  CreateSite,
  UpdateDataBase,
  UpdateImage,
  UpdateSite,
} from 'src/common/input/site.input';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { Page0Food } from 'src/pages/entities/food-page.model';
import { Pages0FoodService } from 'src/pages/food-pages/service';
import { Data, ListSiteResponse, Site, SiteFood } from '../entities/site.model';
import { FoodSitesService } from './food-sites.service';

// import { PagesFoodService } from 'src/pages/food/pages.food.service';

@Resolver(() => SiteFood)
export class FoodSitesResolver {
  constructor(
    private readonly siteService: FoodSitesService,
    private readonly page0FoodService: Pages0FoodService, // private readonly page0EcommerceService: Pages0EcommerceService,
  ) {}

  @Mutation(() => SiteFood, { name: 'createSiteFood' })
  async create(@Args('input') input: CreateSite) {
    const document = await this.siteService.create(input);
    this.page0FoodService.create(this.page0(document._id));

    return document;
  }

  @Mutation(() => SiteFood, { name: 'updateSiteFood' })
  update(@Args('id') id: string, @Args('input') input: UpdateSite) {
    return this.siteService.update(id, input);
  }
  @Mutation(() => SiteFood, { name: 'updateSiteImageFood' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('type') type: string,
    @Args('uid') uid: string,
  ) {
    return this.siteService.updateImage(id, inputImage, type, uid);
  }
  @Mutation(() => SiteFood, { name: 'updateDataBaseFood' })
  updateDataBase(
    @Args('id') id: string,
    @Args('inputDB', { type: () => [UpdateDataBase] })
    inputDB: UpdateDataBase[],
  ) {
    return this.siteService.updateDataBase(id, inputDB);
  }

  @Mutation(() => String, { name: 'deleteSiteFood' })
  delete(@Args('id') id: string) {
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => [String], { name: 'deleteSitesFood' })
  deleteSites(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.siteService.deleteSitesById(ids);
  }

  @Query(() => SiteFood, { name: 'findSiteFood' })
  findSite(@Args('id') id: string) {
    return this.siteService.findSite(id);
  }

  @Query(() => [SiteFood], { name: 'findSitesFood' })
  findSites() {
    return this.siteService.findSites();
  }

  @Query(() => [SiteFood], { name: 'sitesByPagination' })
  findAll(
    @Args('input')
    input: ListInput,
  ) {
    return this.siteService.all(input);
  }

  @Query(() => ListSiteResponse, { name: 'listSitesFoodWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListSiteResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.siteService.all({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('page', () => [Page0Food], { nullable: 'itemsAndList' })
  getPage0(@Parent() { _id }: SiteFood) {
    _id.toString();
    console.log(_id);

    return this.page0FoodService.findPagesByParentId(_id.toString());
  }

  private page0(id: string) {
    return {
      title: 'home',
      description: 'home description',
      type: 'page-blank',
      parentId: id,
      siteId: id,
    };
  }
}
