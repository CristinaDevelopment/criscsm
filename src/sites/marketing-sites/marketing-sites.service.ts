import { Injectable } from '@nestjs/common';
import {
  CreateSite,
  UpdateDataBase,
  UpdateImage,
  UpdateSite,
} from 'src/common/input/site.input';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { SiteMarketing } from '../entities/site.model';
import { SiteDocument } from '../entities/site.schema';
import { MarketingSitesRepository } from './marketing-sites.repository';

@Injectable()
export class MarketingSitesService {
  constructor(
    // private readonly siteEcommerceRepository: SitesEcommerceRepository,
    private readonly siteRepository: MarketingSitesRepository, // private readonly siteEducationRepository: SitesEducationRepository, // private readonly siteMarketingRepository: SitesMarketingRepository,
  ) {}
  async create(input: CreateSite) {
    const data = await this.siteRepository.add(input);
    return this.toModel(data);
  }

  async update(id: string, input: UpdateSite) {
    const data = await this.siteRepository.update(id, input);
    return this.toModel(data);
  }
  async updateImage(id: string, input: UpdateImage, type: string, uid: string) {
    const data = await this.siteRepository.updateImage(id, input, type, uid);
    return this.toModel(data);
  }

  async updateDataBase(id: string, input: UpdateDataBase[]) {
    const data = await this.siteRepository.updateDB(id, input);
    return this.toModel(data);
  }

  async deleteSite(id: string) {
    await this.siteRepository.deleteOne({ _id: id });

    return id;
  }

  async deleteSitesById(ids: string[]) {
    await this.siteRepository.deleteManyPages(ids);
    return ids;
  }

  async findSite(id: string) {
    const data = await this.siteRepository.findOne({ _id: id });
    return this.toModel(data);
  }

  findSites() {
    const data = this.siteRepository.find({});
    return data;
  }

  all(pagination: ListInput) {
    const data = this.siteRepository.All(pagination, {});

    return data;
  }

  private toModel(siteDocument: SiteDocument): SiteMarketing {
    return {
      _id: siteDocument._id.toHexString(),
      data: siteDocument.data,
      url: siteDocument.url,
    };
  }
}
