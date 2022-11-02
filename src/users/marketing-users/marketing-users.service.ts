import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetSite, GetUser } from '../dto/user.args';
import { CreateUser, UpdateUser } from '../dto/user.input';
import { User, UserMarketing } from '../entities/user.model';
import { UserDocument } from '../entities/user.schema';
import { UserMarketingRepository } from './marketing-users.repository';

@Injectable()
export class UserMarketingService {
  constructor(private readonly userRepository: UserMarketingRepository) {}

  async create(input: CreateUser) {
    const dataDocument = await this.userRepository.add(input);
    return this.toModel(dataDocument);
  }

  async update(id: string, input: UpdateUser) {
    const dataDocument = await this.userRepository.update(id, input);
    return this.toModel(dataDocument);
  }

  async findUserByEmail(email: string) {
    const dataDocument = await this.userRepository.findOne({ email: email });
    return this.toModel(dataDocument);
  }
  async findUser(id: string) {
    const dataDocument = await this.userRepository.findOne({ _id: id });
    return this.toModel(dataDocument);
  }

  async deleteUser(id: string) {
    await this.userRepository.deleteOne({ _id: id });
    return id;
  }
  async deleteUsers(ids: string[]) {
    await this.userRepository.deleteMany(ids);
    return 'users deleted';
  }

  findAll() {
    return this.userRepository.find({});
  }

  private toModel(userDocument: UserDocument): UserMarketing {
    return {
      _id: userDocument._id.toHexString(),
      data: userDocument.data,
      password: userDocument.password,
      email: userDocument.email,
      siteId: userDocument.siteId,
    };
  }
}
