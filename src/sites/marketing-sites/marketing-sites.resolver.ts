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
import { Page0Marketing } from 'src/pages/entities/food-page.model';
import { Pages0MarketingService } from 'src/pages/marketing-pages/service';
import { ListSiteResponse, SiteMarketing } from '../entities/site.model';
import { MarketingSitesService } from './marketing-sites.service';

// import { PagesFoodService } from 'src/pages/food/pages.food.service';

@Resolver(() => SiteMarketing)
export class MarketingSitesResolver {
  constructor(
    private readonly siteService: MarketingSitesService,
    private readonly page0MarketingService: Pages0MarketingService,
  ) {}

  @Mutation(() => SiteMarketing, { name: 'createSiteMarketing' })
  async create(@Args('input') input: CreateSite) {
    const document = await this.siteService.create(input);
    this.page0MarketingService.create(this.page0(document._id));

    return document;
  }

  @Mutation(() => SiteMarketing, { name: 'updateSiteMarketing' })
  update(@Args('id') id: string, @Args('input') input: UpdateSite) {
    return this.siteService.update(id, input);
  }
  @Mutation(() => SiteMarketing, { name: 'updateSiteImageMarketing' })
  updateImage(
    @Args('id') id: string,
    @Args('inputImage') inputImage: UpdateImage,
    @Args('type') type: string,
    @Args('uid') uid: string,
  ) {
    return this.siteService.updateImage(id, inputImage, type, uid);
  }
  @Mutation(() => SiteMarketing, { name: 'updateDataBaseMarketing' })
  updateDataBase(
    @Args('id') id: string,
    @Args('inputDB', { type: () => [UpdateDataBase] })
    inputDB: UpdateDataBase[],
  ) {
    return this.siteService.updateDataBase(id, inputDB);
  }

  @Mutation(() => String, { name: 'deleteSiteMarketing' })
  delete(@Args('id') id: string) {
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => [String], { name: 'deleteSitesMarketing' })
  deleteSites(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.siteService.deleteSitesById(ids);
  }

  @Query(() => SiteMarketing, { name: 'findSiteMarketing' })
  findSite(@Args('id') id: string) {
    return this.siteService.findSite(id);
  }

  @Query(() => [SiteMarketing], { name: 'findSitesMarketing' })
  findSites() {
    return this.siteService.findSites();
  }

  @Query(() => [SiteMarketing], { name: 'sitesByPagination' })
  findAll(
    @Args('input')
    input: ListInput,
  ) {
    return this.siteService.all(input);
  }

  @Query(() => ListSiteResponse, { name: 'listSitesMarketingWithCursor' })
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

  @ResolveField('page', () => [Page0Marketing], { nullable: 'itemsAndList' })
  getPage0(@Parent() { _id }: SiteMarketing) {
    // console.log(_id.toString());
    return this.page0MarketingService.findPagesByParentId(_id.toString());
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
