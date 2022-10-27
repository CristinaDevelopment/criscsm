import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HardwarePagesService } from './hardware-pages.service';
import { HardwarePage } from './entities/hardware-page.entity';
import { CreateHardwarePageInput } from './dto/create-hardware-page.input';
import { UpdateHardwarePageInput } from './dto/update-hardware-page.input';

@Resolver(() => HardwarePage)
export class HardwarePagesResolver {
  constructor(private readonly hardwarePagesService: HardwarePagesService) {}

  @Mutation(() => HardwarePage)
  createHardwarePage(@Args('createHardwarePageInput') createHardwarePageInput: CreateHardwarePageInput) {
    return this.hardwarePagesService.create(createHardwarePageInput);
  }

  @Query(() => [HardwarePage], { name: 'hardwarePages' })
  findAll() {
    return this.hardwarePagesService.findAll();
  }

  @Query(() => HardwarePage, { name: 'hardwarePage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hardwarePagesService.findOne(id);
  }

  @Mutation(() => HardwarePage)
  updateHardwarePage(@Args('updateHardwarePageInput') updateHardwarePageInput: UpdateHardwarePageInput) {
    return this.hardwarePagesService.update(updateHardwarePageInput.id, updateHardwarePageInput);
  }

  @Mutation(() => HardwarePage)
  removeHardwarePage(@Args('id', { type: () => Int }) id: number) {
    return this.hardwarePagesService.remove(id);
  }
}
