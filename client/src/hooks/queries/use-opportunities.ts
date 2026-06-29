import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createOpportunity,
  deleteOpportunity,
  getOpportunities,
  getOpportunity,
  updateOpportunity,
  type CreateOpportunityInput,
  type UpdateOpportunityInput,
} from "@/api/opportunities"
import { useAuthReady } from "@/hooks/use-workspace"

import { queryKeys } from "./keys"

export function useOpportunities() {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.opportunities.list(workspaceId),
    queryFn: getOpportunities,
    enabled: isReady,
  })
}

export function useOpportunity(id: string) {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.opportunities.detail(workspaceId, id),
    queryFn: () => getOpportunity(id),
    enabled: isReady && Boolean(id),
  })
}

export function useCreateOpportunity() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (input: CreateOpportunityInput) => createOpportunity(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.opportunities.list(workspaceId),
      })
    },
  })
}

export function useUpdateOpportunity() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string
      input: UpdateOpportunityInput
    }) => updateOpportunity(id, input),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.opportunities.list(workspaceId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.opportunities.detail(workspaceId, variables.id),
      })
    },
  })
}

export function useDeleteOpportunity() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (id: string) => deleteOpportunity(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.opportunities.list(workspaceId),
      })
    },
  })
}
