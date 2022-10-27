import { Injectable } from '@nestjs/common';
import { UpdateImage } from 'src/common/input/site.input';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { GetPage } from '../../dto/food-page.args';
import { CreatePage, UpdatePage } from '../../dto/food-page.input';
import { Page1Food } from '../../entities/food-page.model';
import { PageDocument } from '../../entities/food-page.schema';
import { Pages1FoodRepository } from '../food-pages.repository';

@Injectable()
export class Pages1FoodService {
  constructor(private readonly pageRepository: Pages1FoodRepository) {}

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
  }: PageDocument): Page1Food {
    return {
      _id: _id.toHexString(),
      data: data,
      siteId: siteId,
      parentId: parentId,
      slug: slug,
    };
  }
}
