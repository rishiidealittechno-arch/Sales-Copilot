export interface Timestamps {
  createdAt: string
  updatedAt: string
}

export interface Account extends Timestamps {
  id: string
  workspaceId: string
  name: string
  website: string | null
  industry: string | null
  description: string | null
}

export interface CreateAccountInput {
  name: string
  website?: string
  industry?: string
  description?: string
}

export interface UpdateAccountInput {
  name?: string
  website?: string
  industry?: string
  description?: string
}

export interface Contact extends Timestamps {
  id: string
  workspaceId: string
  accountId: string
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  title: string | null
}

export interface CreateContactInput {
  accountId: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  title?: string
}

export interface UpdateContactInput {
  accountId?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  title?: string
}

export interface Opportunity extends Timestamps {
  id: string
  workspaceId: string
  accountId: string
  name: string
  stage: string | null
  amount: string | null
  closeDate: string | null
}

export interface CreateOpportunityInput {
  accountId: string
  name: string
  stage?: string
  amount?: string
  closeDate?: string
}

export interface UpdateOpportunityInput {
  accountId?: string
  name?: string
  stage?: string
  amount?: string
  closeDate?: string
}

export interface Deal extends Timestamps {
  id: string
  workspaceId: string
  opportunityId: string
  name: string
  value: string | null
  status: string | null
}

export interface CreateDealInput {
  opportunityId: string
  name: string
  value?: string
  status?: string
}

export interface UpdateDealInput {
  opportunityId?: string
  name?: string
  value?: string
  status?: string
}

export interface Task extends Timestamps {
  id: string
  workspaceId: string
  opportunityId: string | null
  title: string
  description: string | null
  status: string
  dueDate: string | null
}

export interface CreateTaskInput {
  opportunityId?: string
  title: string
  description?: string
  status?: string
  dueDate?: string
}

export interface UpdateTaskInput {
  opportunityId?: string | null
  title?: string
  description?: string
  status?: string
  dueDate?: string | null
}
