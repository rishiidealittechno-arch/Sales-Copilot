import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
  type CreateTaskInput,
  type UpdateTaskInput,
} from "@/api/tasks"
import { useAuthReady } from "@/hooks/use-workspace"

import { queryKeys } from "./keys"

export function useTasks() {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.tasks.list(workspaceId),
    queryFn: getTasks,
    enabled: isReady,
  })
}

export function useTask(id: string) {
  const { isReady, workspaceId } = useAuthReady()

  return useQuery({
    queryKey: queryKeys.tasks.detail(workspaceId, id),
    queryFn: () => getTask(id),
    enabled: isReady && Boolean(id),
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.list(workspaceId),
      })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      updateTask(id, input),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.list(workspaceId),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.detail(workspaceId, variables.id),
      })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  const { workspaceId } = useAuthReady()

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.list(workspaceId),
      })
    },
  })
}
