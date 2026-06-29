import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  type CreateContactInput,
  type UpdateContactInput,
} from "@/api/contacts"
import { useAuthReady } from "@/hooks/use-workspace"

import { queryKeys } from "./keys"

export function useContacts() {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.contacts.list(workspaceId),
    queryFn: getContacts,
    enabled: isReady,
  })
}

export function useContact(id: string) {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.contacts.detail(workspaceId, id),
    queryFn: () => getContact(id),
    enabled: isReady && Boolean(id),
  })
}

export function useCreateContact() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (input: CreateContactInput) => createContact(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.contacts.list(workspaceId),
      })
    },
  })
}

export function useUpdateContact() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateContactInput }) =>
      updateContact(id, input),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.contacts.list(workspaceId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.contacts.detail(workspaceId, variables.id),
      })
    },
  })
}

export function useDeleteContact() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.contacts.list(workspaceId),
      })
    },
  })
}
