import axios, { type AxiosInstance } from "axios"

export type ServiceName =
  | "accounts"
  | "contacts"
  | "opportunities"
  | "deals"
  | "tasks"

const serviceBaseUrls: Record<ServiceName, string> = {
  accounts:
    import.meta.env.VITE_ACCOUNTS_API_URL ?? "http://localhost:3001",
  contacts:
    import.meta.env.VITE_CONTACTS_API_URL ?? "http://localhost:3002",
  opportunities:
    import.meta.env.VITE_OPPORTUNITIES_API_URL ?? "http://localhost:3003",
  deals: import.meta.env.VITE_DEALS_API_URL ?? "http://localhost:3004",
  tasks: import.meta.env.VITE_TASKS_API_URL ?? "http://localhost:3005",
}

export function createServiceApi(service: ServiceName): AxiosInstance {
  const client = axios.create({
    baseURL: serviceBaseUrls[service],
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })

  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  )

  return client
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export const accountsApi = createServiceApi("accounts")
export const contactsApi = createServiceApi("contacts")
export const opportunitiesApi = createServiceApi("opportunities")
export const dealsApi = createServiceApi("deals")
export const tasksApi = createServiceApi("tasks")
