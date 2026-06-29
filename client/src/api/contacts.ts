import { contactsApi } from "@/lib/api"

import type {
  Contact,
  CreateContactInput,
  UpdateContactInput,
} from "./types"

export async function getContacts() {
  const { data } = await contactsApi.get<Contact[]>("/contacts")
  return data
}

export async function getContact(id: string) {
  const { data } = await contactsApi.get<Contact>(`/contacts/${id}`)
  return data
}

export async function createContact(input: CreateContactInput) {
  const { data } = await contactsApi.post<Contact>("/contacts", input)
  return data
}

export async function updateContact(id: string, input: UpdateContactInput) {
  const { data } = await contactsApi.patch<Contact>(`/contacts/${id}`, input)
  return data
}

export async function deleteContact(id: string) {
  const { data } = await contactsApi.delete<{ id: string }>(`/contacts/${id}`)
  return data
}
