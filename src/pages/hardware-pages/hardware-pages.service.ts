import { Injectable } from '@nestjs/common';
import { CreateHardwarePageInput } from './dto/create-hardware-page.input';
import { UpdateHardwarePageInput } from './dto/update-hardware-page.input';

@Injectable()
export class HardwarePagesService {
  create(createHardwarePageInput: CreateHardwarePageInput) {
    return 'This action adds a new hardwarePage';
  }

  findAll() {
    return `This action returns all hardwarePages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hardwarePage`;
  }

  update(id: number, updateHardwarePageInput: UpdateHardwarePageInput) {
    return `This action updates a #${id} hardwarePage`;
  }

  remove(id: number) {
    return `This action removes a #${id} hardwarePage`;
  }
}
