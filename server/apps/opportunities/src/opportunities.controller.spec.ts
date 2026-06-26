import { Test, TestingModule } from '@nestjs/testing';
import { OpportunitiesController } from './opportunities.controller';
import { OpportunitiesService } from './opportunities.service';

describe('OpportunitiesController', () => {
  let opportunitiesController: OpportunitiesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OpportunitiesController],
      providers: [OpportunitiesService],
    }).compile();

    opportunitiesController = app.get<OpportunitiesController>(OpportunitiesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(opportunitiesController.getHello()).toBe('Hello World!');
    });
  });
});
