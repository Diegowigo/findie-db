import { Test, TestingModule } from '@nestjs/testing';
import { KlaviyoController } from './klaviyo.controller';

describe('KlaviyoController', () => {
  let controller: KlaviyoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KlaviyoController],
    }).compile();

    controller = module.get<KlaviyoController>(KlaviyoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
