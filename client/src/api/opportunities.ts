import { opportunitiesApi } from "@/lib/api"

import type {
  CreateOpportunityInput,
  Opportunity,
  UpdateOpportunityInput,
} from "./types"

export async function getOpportunities() {
  const { data } = await opportunitiesApi.get<Opportunity[]>("/opportunities")
  return data
}

export async function getOpportunity(id: string) {
  const { data } = await opportunitiesApi.get<Opportunity>(
    `/opportunities/${id}`
  )
  return data
}

export async function createOpportunity(input: CreateOpportunityInput) {
  const { data } = await opportunitiesApi.post<Opportunity>(
    "/opportunities",
    input
  )
  return data
}

export async function updateOpportunity(
  id: string,
  input: UpdateOpportunityInput
) {
  const { data } = await opportunitiesApi.patch<Opportunity>(
    `/opportunities/${id}`,
    input
  )
  return data
}

export async function deleteOpportunity(id: string) {
  const { data } = await opportunitiesApi.delete<{ id: string }>(
    `/opportunities/${id}`
  )
  return data
}
