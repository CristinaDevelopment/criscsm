import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryPage } from 'src/common/abstract';
import {
  Page0Marketing,
  Page1Marketing,
  Page10Marketing,
  Page2Marketing,
  Page3Marketing,
  Page4Marketing,
  Page5Marketing,
  Page6Marketing,
  Page7Marketing,
  Page8Marketing,
  Page9Marketing,
} from '../entities/food-page.model';
import { PageDocument } from '../entities/food-page.schema';

@Injectable()
export class Pages0MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages0MarketingRepository.name);
  constructor(
    @InjectModel(Page0Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages1MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages1MarketingRepository.name);
  constructor(
    @InjectModel(Page1Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages2MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages2MarketingRepository.name);
  constructor(
    @InjectModel(Page2Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class Pages3MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages3MarketingRepository.name);
  constructor(
    @InjectModel(Page3Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages4MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages4MarketingRepository.name);
  constructor(
    @InjectModel(Page4Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages5MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages5MarketingRepository.name);
  constructor(
    @InjectModel(Page5Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages6MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages6MarketingRepository.name);
  constructor(
    @InjectModel(Page6Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages7MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages7MarketingRepository.name);
  constructor(
    @InjectModel(Page7Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages8MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages8MarketingRepository.name);
  constructor(
    @InjectModel(Page8Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages9MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages9MarketingRepository.name);
  constructor(
    @InjectModel(Page9Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages10MarketingRepository extends AbstractRepositoryPage<PageDocument> {
  protected readonly logger = new Logger(Pages10MarketingRepository.name);
  constructor(
    @InjectModel(Page10Marketing.name, 'pagesMarketingDB')
    pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
