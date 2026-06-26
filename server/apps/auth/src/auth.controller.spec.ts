import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('health', () => {
    it('should return ok', () => {
      expect(authController.health()).toEqual({ status: 'ok' });
    });
  });
});
