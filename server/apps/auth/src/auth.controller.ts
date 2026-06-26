import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import type { Request, Response } from 'express';
import { auth } from './auth';

const authHandler = toNodeHandler(auth);

@Controller()
export class AuthController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @All('api/auth/*splat')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    await authHandler(req, res);
  }
}
