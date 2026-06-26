import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

describe('LeadsController', () => {
  let leadsController: LeadsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [LeadsService],
    }).compile();

    leadsController = app.get<LeadsController>(LeadsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(leadsController.getHello()).toBe('Hello World!');
    });
  });
});
