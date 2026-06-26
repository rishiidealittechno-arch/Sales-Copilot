import 'dotenv/config';
import { apiKey } from '@better-auth/api-key';
import { betterAuth } from 'better-auth';
import {
  lastLoginMethod,
  multiSession,
  organization,
} from 'better-auth/plugins';
import { Pool } from 'pg';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    'Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in server/.env',
  );
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3200',
  secret: process.env.BETTER_AUTH_SECRET ?? 'development-secret-change-me',
  database: new Pool({
    connectionString:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@localhost:5432/leads-ai',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        console.log(`Delete account for ${user.email}: ${url}`);
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: [
        'openid',
        'email',
        'profile',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
      ],
      accessType: 'offline',
      prompt: 'consent',
    },
  },
  trustedOrigins: [
    process.env.CLIENT_URL ?? 'http://localhost:5173',
    'http://localhost:5173',
  ],
  plugins: [
    lastLoginMethod(),
    organization({
      allowUserToCreateOrganization: true,
      organizationLimit: 10,
      membershipLimit: 100,
      creatorRole: 'owner',
      defaultOrganizationIdField: 'slug',
      invitationExpiresIn: 60 * 60 * 24 * 7,
      invitationLimit: 50,
      cancelPendingInvitationsOnReInvite: true,
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.CLIENT_URL ?? 'http://localhost:5173'}/accept-invitation?id=${data.id}`;
        console.log(`Invite ${data.email}: ${inviteLink}`);
      },
    }),
    apiKey({
      enableMetadata: true,
      defaultPrefix: 'oc_',
    }),
    multiSession(),
  ],
});
