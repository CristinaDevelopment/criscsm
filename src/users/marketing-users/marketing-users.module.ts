import { Module } from '@nestjs/common';
import { UserMarketingService } from './marketing-users.service';
import { UserMarketingResolver } from './marketing-users.resolver';
import { UserMarketingRepository } from './marketing-users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMarketing } from '../entities/user.model';
import { UserMarketingSchema } from '../entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: UserMarketing.name, schema: UserMarketingSchema }],
      'usersMarketingDB',
    ),
  ],
  providers: [
    UserMarketingResolver,
    UserMarketingService,
    UserMarketingRepository,
  ],
  exports: [UserMarketingService],
})
export class UserMarketingModule {}
