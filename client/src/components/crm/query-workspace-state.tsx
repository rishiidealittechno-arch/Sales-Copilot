import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthReady } from "@/hooks/use-workspace"

export function QueryWorkspaceState({
  isLoading,
  isError,
  error,
  children,
  emptyMessage = "No records found.",
  isEmpty = false,
}: {
  isLoading?: boolean
  isError?: boolean
  error?: Error | null
  children: React.ReactNode
  emptyMessage?: string
  isEmpty?: boolean
}) {
  const { isPending, isAuthenticated, workspaceId } = useAuthReady()

  if (isPending) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Sign in to view CRM data.
        </p>
      </div>
    )
  }

  if (!workspaceId) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Select an active workspace in settings. The backend reads it from your
          session automatically.
        </p>
        <Button
          className="mt-4"
          size="sm"
          nativeButton={false}
          render={<Link to="/settings/workspace" />}
        >
          Go to workspace settings
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {error?.message ?? "Failed to load data."}
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return children
}
