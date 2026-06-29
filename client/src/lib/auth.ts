import { createAuthClient } from "better-auth/react"
import { apiKeyClient } from "@better-auth/api-key/client"
import {
  lastLoginMethodClient,
  multiSessionClient,
  organizationClient,
} from "better-auth/client/plugins"

const AUTH_BASE_URL =
  import.meta.env.VITE_BETTER_AUTH_URL ?? "http://localhost:3200"

function resolveClientCallbackURL(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  return new URL(path, window.location.origin).toString()
}

export const authClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    lastLoginMethodClient(),
    organizationClient(),
    apiKeyClient(),
    multiSessionClient(),
  ],
})

export const { signIn, signUp, signOut, useSession, organization, apiKey, listSessions, revokeSession, revokeOtherSessions, useListOrganizations, useActiveOrganization } =
  authClient

export function signInWithGoogle(callbackPath = "/") {
  return signIn.social({
    provider: "google",
    callbackURL: resolveClientCallbackURL(callbackPath),
    errorCallbackURL: resolveClientCallbackURL("/login"),
  })
}
