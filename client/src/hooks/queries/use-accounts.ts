import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
  type CreateAccountInput,
  type UpdateAccountInput,
} from "@/api/accounts"
import { useAuthReady } from "@/hooks/use-workspace"

import { queryKeys } from "./keys"

export function useAccounts() {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.accounts.list(workspaceId),
    queryFn: getAccounts,
    enabled: isReady,
  })
}

export function useAccount(id: string) {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.accounts.detail(workspaceId, id),
    queryFn: () => getAccount(id),
    enabled: isReady && Boolean(id),
  })
}

export function useCreateAccount() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (input: CreateAccountInput) => createAccount(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.accounts.list(workspaceId),
      })
    },
  })
}

export function useUpdateAccount() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAccountInput }) =>
      updateAccount(id, input),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.accounts.list(workspaceId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.accounts.detail(workspaceId, variables.id),
      })
    },
  })
}

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.accounts.list(workspaceId),
      })
    },
  })
}
