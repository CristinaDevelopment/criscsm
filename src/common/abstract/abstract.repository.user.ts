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
import { CreatePage, UpdatePage } from 'src/pages/dto/food-page.input';
import { UpdateImage } from '../input/site.input';
import { CreateUser, UpdateUser } from 'src/users/dto/user.input';
// import { UpdateImage } from 'src/product/dto/product.input';
import * as bcrypt from 'bcrypt';

export abstract class AbstractRepositoryUser<
  TDocument extends AbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}
  async add(input: CreateUser): Promise<TDocument> {
    const page = await this.model.findOne(
      {
        email: input.email,
      },
      {},
      { lean: true },
    );

    if (page) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.email}"`,
      );
    }
    const createdDocument = new this.model({
      ...this.userCreated(input),
      password: await bcrypt.hash(input.password, 10),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async update(
    id: string,
    input: UpdateUser,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const page = await this.model.findOne(
      {
        _id: { $ne: id },
        email: input.email,
      },
      {},
      { lean: true },
    );
    if (page) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.email}"`,
      );
    }
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      this.userUpdate(input),
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
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      this.pageImage(input, uid),
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

  async updateMany(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.updateMany(
      { siteId: filterQuery.siteId },
      { $set: update },
    );
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

  async deleteManyUsers(ids: string[]) {
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

  private userCreated({
    role,
    email,
    image,
    username,
    oAuth,
    password,
    siteId,
  }: CreateUser) {
    return {
      _id: new Types.ObjectId(),
      data: {
        role: role,
        image: {
          src: image,
          alt: username,
        },
        username: username,
        status: true,
        oAuth: {
          provider: oAuth ? oAuth : 'credentials',
        },
      },
      updateDate: {
        createdAt: new Date(),
      },
      email: email.toLowerCase(),
      // password: await bcrypt.hash(password, 10),
      siteId: siteId,
    };
  }
  private userUpdate({ username, image }: UpdateUser) {
    return {
      $set: {
        'data.username': username,
        'data.image.src': image,
        'data.image.alt': username,
      },
      $push: { 'data.updateDate.register': { updatedAt: new Date() } },
    };
  }
  private pageImage(input: UpdateImage, uid: string) {
    return {
      $set: {
        'data.seo.image.src': input.src,
        'data.seo.image.alt': input.alt,
        'data.updateDate.lastUpdatedAt': new Date(),
      },
      $push: {
        'data.updateDate.register': {
          uid: uid,
          change: 'image update',
          updatedAt: new Date(),
        },
      },
    };
  }
}
