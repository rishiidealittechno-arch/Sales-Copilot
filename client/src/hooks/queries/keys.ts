export const queryKeys = {
  accounts: {
    all: ["accounts"] as const,
    list: (workspaceId: string | null) =>
      [...queryKeys.accounts.all, "list", workspaceId] as const,
    detail: (workspaceId: string | null, id: string) =>
      [...queryKeys.accounts.all, "detail", workspaceId, id] as const,
  },
  contacts: {
    all: ["contacts"] as const,
    list: (workspaceId: string | null) =>
      [...queryKeys.contacts.all, "list", workspaceId] as const,
    detail: (workspaceId: string | null, id: string) =>
      [...queryKeys.contacts.all, "detail", workspaceId, id] as const,
  },
  opportunities: {
    all: ["opportunities"] as const,
    list: (workspaceId: string | null) =>
      [...queryKeys.opportunities.all, "list", workspaceId] as const,
    detail: (workspaceId: string | null, id: string) =>
      [...queryKeys.opportunities.all, "detail", workspaceId, id] as const,
  },
  deals: {
    all: ["deals"] as const,
    list: (workspaceId: string | null) =>
      [...queryKeys.deals.all, "list", workspaceId] as const,
    detail: (workspaceId: string | null, id: string) =>
      [...queryKeys.deals.all, "detail", workspaceId, id] as const,
  },
  tasks: {
    all: ["tasks"] as const,
    list: (workspaceId: string | null) =>
      [...queryKeys.tasks.all, "list", workspaceId] as const,
    detail: (workspaceId: string | null, id: string) =>
      [...queryKeys.tasks.all, "detail", workspaceId, id] as const,
  },
}
