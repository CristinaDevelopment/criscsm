import { Injectable } from '@nestjs/common';
import { UpdateImage } from 'src/common/input/site.input';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { Page6Marketing } from '../../entities/food-page.model';
import { PageDocument } from '../../entities/food-page.schema';
import { Pages6MarketingRepository } from '../marketing-pages.repository';
@Injectable()
export class Pages6MarketingService {
  constructor(private readonly pageRepository: Pages6MarketingRepository) {}

  async create(input: CreatePage) {
    const document = await this.pageRepository.add(input);
    return this.toModel(document);
  }

  async update(id: string, input: UpdatePage) {
    const document = await this.pageRepository.update(id, input);
    return this.toModel(document);
  }

  async updateImage(id: string, input: UpdateImage, uid: string) {
    const document = await this.pageRepository.updateImage(id, input, uid);
    return this.toModel(document);
  }

  async findPage(id: string) {
    const document = await this.pageRepository.findOne({ _id: id });
    return this.toModel(document);
  }

  findPages() {
    return this.pageRepository.find({});
  }

  async deletePage(id: string) {
    await this.pageRepository.deleteOne({ _id: id });
    return id;
  }

  async deletePagesById(ids: string[]) {
    await this.pageRepository.deleteManyPages(ids);
    return ids;
  }

  findPagesByParentId(parentId: string) {
    return this.pageRepository.find({ parentId: parentId });
  }

  all(pagination: ListInput, parentId: string) {
    return this.pageRepository.All(pagination, { parentId: parentId });
  }

  private toModel({
    _id,
    data,
    siteId,
    parentId,
    slug,
  }: PageDocument): Page6Marketing {
    return {
      _id: _id.toHexString(),
      data: data,
      siteId: siteId,
      parentId: parentId,
      slug: slug,
    };
  }
}
