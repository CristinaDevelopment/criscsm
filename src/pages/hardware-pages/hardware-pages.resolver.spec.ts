import { Test, TestingModule } from '@nestjs/testing';
import { HardwarePagesResolver } from './hardware-pages.resolver';
import { HardwarePagesService } from './hardware-pages.service';

describe('HardwarePagesResolver', () => {
  let resolver: HardwarePagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HardwarePagesResolver, HardwarePagesService],
    }).compile();

    resolver = module.get<HardwarePagesResolver>(HardwarePagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
