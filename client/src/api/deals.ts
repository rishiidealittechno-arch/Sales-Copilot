import { dealsApi } from "@/lib/api"

import type { CreateDealInput, Deal, UpdateDealInput } from "./types"

export async function getDeals() {
  const { data } = await dealsApi.get<Deal[]>("/deals")
  return data
}

export async function getDeal(id: string) {
  const { data } = await dealsApi.get<Deal>(`/deals/${id}`)
  return data
}

export async function createDeal(input: CreateDealInput) {
  const { data } = await dealsApi.post<Deal>("/deals", input)
  return data
}

export async function updateDeal(id: string, input: UpdateDealInput) {
  const { data } = await dealsApi.patch<Deal>(`/deals/${id}`, input)
  return data
}

export async function deleteDeal(id: string) {
  const { data } = await dealsApi.delete<{ id: string }>(`/deals/${id}`)
  return data
}
