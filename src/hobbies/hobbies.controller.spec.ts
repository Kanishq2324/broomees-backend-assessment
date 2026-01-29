import { Test, TestingModule } from '@nestjs/testing';
import { HobbiesController } from './hobbies.controller';

describe('HobbiesController', () => {
  let controller: HobbiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HobbiesController],
    }).compile();

    controller = module.get<HobbiesController>(HobbiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
