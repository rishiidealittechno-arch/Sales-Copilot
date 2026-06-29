import { tasksApi } from "@/lib/api"

import type { CreateTaskInput, Task, UpdateTaskInput } from "./types"

export async function getTasks() {
  const { data } = await tasksApi.get<Task[]>("/tasks")
  return data
}

export async function getTask(id: string) {
  const { data } = await tasksApi.get<Task>(`/tasks/${id}`)
  return data
}

export async function createTask(input: CreateTaskInput) {
  const { data } = await tasksApi.post<Task>("/tasks", input)
  return data
}

export async function updateTask(id: string, input: UpdateTaskInput) {
  const { data } = await tasksApi.patch<Task>(`/tasks/${id}`, input)
  return data
}

export async function deleteTask(id: string) {
  const { data } = await tasksApi.delete<{ id: string }>(`/tasks/${id}`)
  return data
}
