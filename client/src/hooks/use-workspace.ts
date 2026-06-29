import { useSession } from "@/lib/auth"

export function useAuthReady() {
  const { data: session, isPending } = useSession()
  const workspaceId = session?.session?.activeOrganizationId ?? null

  return {
    isAuthenticated: Boolean(session?.user),
    workspaceId,
    isPending,
    isReady: !isPending && Boolean(session?.user && workspaceId),
  }
}

export function useWorkspaceId() {
  const { data: session } = useSession()
  return session?.session?.activeOrganizationId ?? null
}

export function useWorkspace() {
  const { data: session, isPending } = useSession()

  return {
    workspaceId: session?.session?.activeOrganizationId ?? null,
    isWorkspacePending: isPending,
  }
}
