import type { Request } from 'express';

import { auth } from './auth';

type SessionResult = Awaited<ReturnType<typeof auth.api.getSession>>;

export type AuthUser = NonNullable<SessionResult>['user'];
export type AuthSession = NonNullable<SessionResult>['session'];

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  session?: AuthSession;
  workspaceId?: string;
}
