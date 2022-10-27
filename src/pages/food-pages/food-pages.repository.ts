import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryPage } from 'src/common/abstract';
import {
  Page0Food,
  Page1Food,
  Page10Food,
  Page2Food,
  Page3Food,
  Page4Food,
  Page5Food,
  Page6Food,
  Page7Food,
  Page8Food,
  Page9Food,
} from '../entities/food-page.model';
import { PageDocument } from '../entities/food-page.schema';

@Injectable()
export class Pages0FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages0FoodRepository.name);
  constructor(
    @InjectModel(Page0Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages1FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages1FoodRepository.name);
  constructor(
    @InjectModel(Page1Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages2FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages2FoodRepository.name);
  constructor(
    @InjectModel(Page2Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class Pages3FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages3FoodRepository.name);
  constructor(
    @InjectModel(Page3Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages4FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages4FoodRepository.name);
  constructor(
    @InjectModel(Page4Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages5FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages5FoodRepository.name);
  constructor(
    @InjectModel(Page5Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages6FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages6FoodRepository.name);
  constructor(
    @InjectModel(Page6Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages7FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages7FoodRepository.name);
  constructor(
    @InjectModel(Page7Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages8FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages8FoodRepository.name);
  constructor(
    @InjectModel(Page8Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages9FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages9FoodRepository.name);
  constructor(
    @InjectModel(Page9Food.name, 'pagesFoodDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages10FoodRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages10FoodRepository.name);
  constructor(
    @InjectModel(Page10Food.name, 'pagesFoodDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
