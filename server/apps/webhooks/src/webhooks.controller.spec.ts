import { Test, TestingModule } from '@nestjs/testing';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

describe('WebhooksController', () => {
  let webhooksController: WebhooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WebhooksController],
      providers: [WebhooksService],
    }).compile();

    webhooksController = app.get<WebhooksController>(WebhooksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(webhooksController.getHello()).toBe('Hello World!');
    });
  });
});
