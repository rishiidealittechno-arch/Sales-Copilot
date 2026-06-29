import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createDeal,
  deleteDeal,
  getDeal,
  getDeals,
  updateDeal,
  type CreateDealInput,
  type UpdateDealInput,
} from "@/api/deals"
import { useAuthReady } from "@/hooks/use-workspace"

import { queryKeys } from "./keys"

export function useDeals() {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.deals.list(workspaceId),
    queryFn: getDeals,
    enabled: isReady,
  })
}

export function useDeal(id: string) {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.deals.detail(workspaceId, id),
    queryFn: () => getDeal(id),
    enabled: isReady && Boolean(id),
  })
}

export function useCreateDeal() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (input: CreateDealInput) => createDeal(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.deals.list(workspaceId),
      })
    },
  })
}

export function useUpdateDeal() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateDealInput }) =>
      updateDeal(id, input),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.deals.list(workspaceId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.deals.detail(workspaceId, variables.id),
      })
    },
  })
}

export function useDeleteDeal() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (id: string) => deleteDeal(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.deals.list(workspaceId),
      })
    },
  })
}
