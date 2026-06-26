import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { fromNodeHeaders } from 'better-auth/node';

import { auth } from '../auth';
import type { AuthenticatedRequest } from '../auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session?.user || !session.session) {
      throw new UnauthorizedException('Authentication required');
    }

    const workspaceId = session.session.activeOrganizationId;

    if (!workspaceId) {
      throw new BadRequestException(
        'No active workspace on your session. Select a workspace in settings first.',
      );
    }

    request.user = session.user;
    request.session = session.session;
    request.workspaceId = workspaceId;

    return true;
  }
}
