import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUser, UpdateUser } from '../dto/user.input';
import { UserMarketingService } from './marketing-users.service';
import { UserMarketing } from '../entities/user.model';

@Resolver(() => UserMarketing)
export class UserMarketingResolver {
  constructor(private readonly userService: UserMarketingService) {}

  @Mutation(() => UserMarketing, { name: 'createUserMarketing' })
  create(@Args('input') input: CreateUser) {
    return this.userService.create(input);
  }

  @Mutation(() => UserMarketing, { name: 'updateUserMarketing' })
  update(@Args('id') id: string, @Args('input') input: UpdateUser) {
    return this.userService.update(id, input);
  }

  @Mutation(() => String, { name: 'deleteUserMarketing' })
  delete(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @Mutation(() => String, { name: 'deleteUsersMarketing' })
  deletes(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.userService.deleteUsers(ids);
  }

  @Query(() => UserMarketing, { name: 'findUserMarketing' })
  async findUser(@Args('id') id: string) {
    return this.userService.findUser(id);
  }

  @Query(() => UserMarketing, { name: 'findUserByEmailMarketing' })
  async findUserByEmail(@Args('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Query(() => [UserMarketing], { name: 'findUsersMarketing' })
  async findUsers() {
    return this.userService.findAll();
  }
}
