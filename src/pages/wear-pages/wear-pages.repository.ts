import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryPage } from 'src/common/abstract';
import {
  Page0Wear,
  Page1Wear,
  Page10Wear,
  Page2Wear,
  Page3Wear,
  Page4Wear,
  Page5Wear,
  Page6Wear,
  Page7Wear,
  Page8Wear,
  Page9Wear,
} from '../entities/food-page.model';
import { PageDocument } from '../entities/food-page.schema';

@Injectable()
export class Pages0WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages0WearRepository.name);
  constructor(
    @InjectModel(Page0Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages1WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages1WearRepository.name);
  constructor(
    @InjectModel(Page1Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages2WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages2WearRepository.name);
  constructor(
    @InjectModel(Page2Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class Pages3WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages3WearRepository.name);
  constructor(
    @InjectModel(Page3Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages4WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages4WearRepository.name);
  constructor(
    @InjectModel(Page4Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages5WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages5WearRepository.name);
  constructor(
    @InjectModel(Page5Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages6WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages6WearRepository.name);
  constructor(
    @InjectModel(Page6Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages7WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages7WearRepository.name);
  constructor(
    @InjectModel(Page7Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages8WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages8WearRepository.name);
  constructor(
    @InjectModel(Page8Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages9WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages9WearRepository.name);
  constructor(
    @InjectModel(Page9Wear.name, 'pagesWearDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages10WearRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages10WearRepository.name);
  constructor(
    @InjectModel(Page10Wear.name, 'pagesWearDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
