import { Module } from '@nestjs/common';
import { HardwarePagesService } from './hardware-pages.service';
import { HardwarePagesResolver } from './hardware-pages.resolver';

@Module({
  providers: [HardwarePagesResolver, HardwarePagesService]
})
export class HardwarePagesModule {}
