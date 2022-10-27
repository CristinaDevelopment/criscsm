import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { ListInput } from '../pagination/dto/list.input';
import { AbstractDocument } from './abstract.schema';
// import { CreatePage, UpdatePage } from '../../pages/dto/page.input';
import { capitalizar, slug } from 'utils/function';
import { uuidv3 } from 'utils';
import {
  CreateSite,
  UpdateDataBase,
  UpdateImage,
  UpdateSite,
} from '../input/site.input';
// import { UpdateImage } from 'src/product/dto/product.input';

export abstract class AbstractRepositorySite<
  TDocument extends AbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async add(input: CreateSite): Promise<TDocument> {
    const createdDocument = new this.model(this.siteCreated(input));
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async update(
    id: string,
    input: UpdateSite,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      this.siteUpdate(input),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
  async updateDB(
    id: string,
    input: UpdateDataBase[],
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          'data.dataBase': input.map((data) => ({
            uid: uuidv3(),
            label: capitalizar(data.type),
            value: slug(data.type),
          })),
          'data.updateDate.lastUpdatedAt': new Date(),
        },
        $push: {
          'data.updateDate.register': {
            change: 'updated site db',
            updatedAt: new Date(),
          },
        },
      },
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async updateImage(
    id: string,
    input: UpdateImage,
    uid: string,
    type: string,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      this.siteImage(input, uid, type),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteOne(filterQuery);
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteMany(filterQuery);
  }

  async deleteManyPages(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } });
  }

  findAll(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const { limit, offset } = paginationQuery;
    return this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ 'data.updateDate.createdAt': 1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async All(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const count = await this.model.count();
    const data = await this.findAll(paginationQuery, filterQuery);
    return { data, count };
  }

  private siteCreated({
    domain,
    name,
    description,
    type,
    client,
    uid,
  }: CreateSite) {
    const web = domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    return {
      _id: new Types.ObjectId(),
      data: {
        name: name,
        description: description,
        dataBase: [],
        siteData: {
          domain: {
            name: nameDomain,
            dlt: dlt,
          },
          client: client,
        },
        type: type,
        seo: {
          title: name,
          href: '#',
          description: description,
        },
        updateDate: {
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          register: [
            {
              uid: uid,
              change: 'created site',
              updatedAt: new Date(),
            },
          ],
        },
      },
      url: domain,
    };
  }
  private siteUpdate({ domain, name, description, type, uid }: UpdateSite) {
    const web = domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    return {
      $set: {
        'data.name': name,
        'data.siteData.domain': {
          name: nameDomain,
          dlt: dlt,
        },
        'data.description': description,
        'data.siteData.type': type,
        'data.siteData.seo.title': name,
        'data.siteData.seo.href': '',
        'data.siteData.seo.description': description,
        'data.updateDate.lastUpdatedAt': new Date(),
        url: domain,
      },
      $push: {
        'data.updateDate.register': {
          uid: uid,
          change: 'updated site',
          updatedAt: new Date(),
        },
      },
    };
  }
  private siteImage({ src, alt }: UpdateImage, type: string, uid: string, ) {
    console.log(type);
    
    return {
      $set:
        type === 'logo'
          ? {
              'data.siteImages.logo': {
                src: src,
                alt: alt,
              },
              'data.updateDate.lastUpdatedAt': new Date(),
            }
          : type === 'banner'
          ? {
              'data.siteImages.banner': {
                src: src,
                alt: alt,
              },
              'data.seo.image.src': src,
              'data.seo.image.alt': alt,
              'data.updateDate.lastUpdatedAt': new Date(),
            }
          : {
              'data.siteImages.icon': {
                src: src,
                alt: alt,
              },
              'data.updateDate.lastUpdatedAt': new Date(),
            },
      $push: {
        'data.updateDate.register': {
          uid: uid,
          change: `${type} image update`,
          updatedAt: new Date(),
        },
      },
    };
  }
}
