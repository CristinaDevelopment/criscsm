import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
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
import { Page0Wear } from 'src/pages/entities/food-page.model';
import { Pages0WearService } from 'src/pages/wear-pages/service';
import { ListSiteResponse, SiteWear } from '../entities/site.model';
import { WearSitesService } from './wear-sites.service';

// import { PagesFoodService } from 'src/pages/food/pages.food.service';

@Resolver(() => SiteWear)
export class WearSitesResolver {
  constructor(
    private readonly siteService: WearSitesService,
    private readonly page0WearService: Pages0WearService,
  ) {}

  @Mutation(() => SiteWear, { name: 'createSiteWear' })
  async create(@Args('input') input: CreateSite) {
    const document = await this.siteService.create(input);
    this.page0WearService.create(this.page0(document._id));

    return document;
  }

  @Mutation(() => SiteWear, { name: 'updateSiteWear' })
  update(@Args('id') id: string, @Args('input') input: UpdateSite) {
    return this.siteService.update(id, input);
  }
  @Mutation(() => SiteWear, { name: 'updateSiteImageWear' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('type') type: string,
    @Args('uid') uid: string,
  ) {
    return this.siteService.updateImage(id, inputImage, type, uid);
  }
  @Mutation(() => SiteWear, { name: 'updateDataBaseWear' })
  updateDataBase(
    @Args('id') id: string,
    @Args('inputDB', { type: () => [UpdateDataBase] })
    inputDB: UpdateDataBase[],
  ) {
    return this.siteService.updateDataBase(id, inputDB);
  }

  @Mutation(() => String, { name: 'deleteSiteWear' })
  delete(@Args('id') id: string) {
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => [String], { name: 'deleteSitesWear' })
  deleteSites(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.siteService.deleteSitesById(ids);
  }

  @Query(() => SiteWear, { name: 'findSiteWear' })
  findSite(@Args('id') id: string) {
    return this.siteService.findSite(id);
  }

  @Query(() => [SiteWear], { name: 'findSitesWear' })
  findSites() {
    return this.siteService.findSites();
  }

  @Query(() => [SiteWear], { name: 'sitesByPagination' })
  findAll(
    @Args('input')
    input: ListInput,
  ) {
    return this.siteService.all(input);
  }

  @Query(() => ListSiteResponse, { name: 'listSitesWearWithCursor' })
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

  @ResolveField('page', () => [Page0Wear], { nullable: 'itemsAndList' })
  getPage0(@Parent() { _id }: SiteWear) {
    // console.log(_id.toString());
    return this.page0WearService.findPagesByParentId(_id.toString());
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
