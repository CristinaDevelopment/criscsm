import { Test, TestingModule } from '@nestjs/testing';
import { HardwarePagesService } from './hardware-pages.service';

describe('HardwarePagesService', () => {
  let service: HardwarePagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HardwarePagesService],
    }).compile();

    service = module.get<HardwarePagesService>(HardwarePagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
