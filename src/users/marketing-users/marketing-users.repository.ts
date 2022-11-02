import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryUser } from 'src/common/abstract';
import { UserMarketing } from '../entities/user.model';
import { UserDocument } from '../entities/user.schema';

@Injectable()
export class UserMarketingRepository extends AbstractRepositoryUser<UserDocument> {
  protected readonly logger = new Logger(UserMarketingRepository.name);
  constructor(
    @InjectModel(UserMarketing.name, 'usersMarketingDB')
    userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
