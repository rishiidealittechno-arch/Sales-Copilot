import { accountsApi } from "@/lib/api"

import type {
  Account,
  CreateAccountInput,
  UpdateAccountInput,
} from "./types"

export async function getAccounts() {
  const { data } = await accountsApi.get<Account[]>("/accounts")
  return data
}

export async function getAccount(id: string) {
  const { data } = await accountsApi.get<Account>(`/accounts/${id}`)
  return data
}

export async function createAccount(input: CreateAccountInput) {
  const { data } = await accountsApi.post<Account>("/accounts", input)
  return data
}

export async function updateAccount(id: string, input: UpdateAccountInput) {
  const { data } = await accountsApi.patch<Account>(`/accounts/${id}`, input)
  return data
}

export async function deleteAccount(id: string) {
  const { data } = await accountsApi.delete<{ id: string }>(`/accounts/${id}`)
  return data
}
