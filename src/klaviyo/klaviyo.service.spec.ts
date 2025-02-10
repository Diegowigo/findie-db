import { Test, TestingModule } from '@nestjs/testing';
import { KlaviyoService } from './klaviyo.service';

describe('KlaviyoService', () => {
  let service: KlaviyoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KlaviyoService],
    }).compile();

    service = module.get<KlaviyoService>(KlaviyoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
