import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositorySite } from 'src/common/abstract';
import { Site, SiteMarketing } from '../entities/site.model';
import { SiteDocument } from '../entities/site.schema';

// @Injectable()
// export class SitesEcommerceRepository extends AbstractRepositorySite<SiteDocument> {
//   protected readonly logger = new Logger(SitesEcommerceRepository.name);
//   constructor(
//     @InjectModel(Site.name, 'sitesEcommerceDB') siteModel: Model<SiteDocument>,
//   ) {
//     super(siteModel);
//   }
// }
@Injectable()
export class MarketingSitesRepository extends AbstractRepositorySite<SiteDocument> {
  protected readonly logger = new Logger(MarketingSitesRepository.name);
  constructor(
    @InjectModel(SiteMarketing.name, 'sitesMarketingDB')
    siteModel: Model<SiteDocument>,
  ) {
    super(siteModel);
  }
}
// @Injectable()
// export class FoodSitesRepository extends AbstractRepositorySite<SiteDocument> {
//   protected readonly logger = new Logger(FoodSitesRepository.name);
//   constructor(
//     @InjectModel(Site.name, 'sitesFoodDB') siteModel: Model<SiteDocument>,
//   ) {
//     super(siteModel);
//   }
// }
// @Injectable()
// export class SitesEducationRepository extends AbstractRepositorySite<SiteDocument> {
//   protected readonly logger = new Logger(SitesEducationRepository.name);
//   constructor(
//     @InjectModel(Site.name, 'sitesEducationDB') siteModel: Model<SiteDocument>,
//   ) {
//     super(siteModel);
//   }
// }
// @Injectable()
// export class SitesMarketingRepository extends AbstractRepositorySite<SiteDocument> {
//   protected readonly logger = new Logger(SitesMarketingRepository.name);
//   constructor(
//     @InjectModel(Site.name, 'sitesMarketingDB') siteModel: Model<SiteDocument>,
//   ) {
//     super(siteModel);
//   }
// }
