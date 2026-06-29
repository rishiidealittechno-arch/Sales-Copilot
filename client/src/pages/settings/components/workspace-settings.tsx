import { useCallback, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  organization,
  useActiveOrganization,
  useListOrganizations,
  useSession,
} from "@/lib/auth"

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function formatDate(value: Date | string | undefined) {
  if (!value) return "—"

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function memberInitials(name: string | undefined, email: string | undefined) {
  const source = name?.trim() || email?.trim() || "?"
  const parts = source.split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return source.slice(0, 2).toUpperCase()
}

function SectionHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function DetailItem({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-xs">{label}</p>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}

export default function WorkspaceSettings() {
  const { data: session, refetch: refetchSession } = useSession()
  const { data: organizations, isPending: isOrgsPending } =
    useListOrganizations()
  const { data: activeOrganization, isPending: isActiveOrgPending } =
    useActiveOrganization()

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [slugTouched, setSlugTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [switchingOrgId, setSwitchingOrgId] = useState<string | null>(null)

  const hasOrganization = (organizations?.length ?? 0) > 0
  const workspaceCount = organizations?.length ?? 0
  const currentUserId = session?.user.id

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name))
    }
  }, [name, slugTouched])

  useEffect(() => {
    if (
      !organizations?.length ||
      activeOrganization ||
      isOrgsPending ||
      isActiveOrgPending
    ) {
      return
    }

    void organization
      .setActive({ organizationId: organizations[0].id })
      .then(() => refetchSession())
  }, [
    organizations,
    activeOrganization,
    isOrgsPending,
    isActiveOrgPending,
    refetchSession,
  ])

  const handleCreate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      const trimmedName = name.trim()
      const trimmedSlug = slug.trim()

      if (!trimmedName) {
        setError("Workspace name is required.")
        return
      }

      if (!trimmedSlug) {
        setError("Workspace URL slug is required.")
        return
      }

      setIsCreating(true)
      try {
        const result = await organization.create({
          name: trimmedName,
          slug: trimmedSlug,
        })

        if (result.error) {
          setError(result.error.message ?? "Failed to create workspace.")
          return
        }

        setName("")
        setSlug("")
        setSlugTouched(false)
        await refetchSession()
      } finally {
        setIsCreating(false)
      }
    },
    [name, slug, refetchSession]
  )

  const handleSwitchWorkspace = useCallback(async (organizationId: string) => {
    setSwitchingOrgId(organizationId)
    try {
      await organization.setActive({ organizationId })
      await refetchSession()
    } finally {
      setSwitchingOrgId(null)
    }
  }, [refetchSession])

  if (isOrgsPending || isActiveOrgPending) {
    return (
      <div className="mx-0 flex max-w-xl items-center justify-center py-24">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    )
  }

  if (hasOrganization) {
    const workspace = activeOrganization ?? organizations?.[0]
    const members = activeOrganization?.members ?? []
    const invitations = activeOrganization?.invitations ?? []

    return (
      <div className="mx-0 max-w-2xl space-y-10 pb-12">
        <section className="space-y-4">
          <SectionHeading
            title="Active workspace"
            description="Details for the workspace you are currently using."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Name" value={workspace?.name ?? "—"} />
            <DetailItem label="Slug" value={workspace?.slug ?? "—"} />
            <DetailItem
              label="Created"
              value={formatDate(workspace?.createdAt)}
            />
            <DetailItem
              label="Members"
              value={activeOrganization ? members.length : "—"}
            />
            <DetailItem
              label="Pending invitations"
              value={activeOrganization ? invitations.length : "—"}
            />
            <DetailItem
              label="Logo"
              value={
                workspace?.logo ? (
                  <a
                    href={workspace.logo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-normal underline-offset-4 hover:underline"
                  >
                    View logo
                  </a>
                ) : (
                  "No logo"
                )
              }
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            nativeButton={false}
            render={<Link to="/settings/members" />}
          >
            Manage members
          </Button>
        </section>

        <Separator />

        <section className="space-y-4">
          <SectionHeading
            title="Members"
            description="People who have access to this workspace."
          />
          {members.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => {
                  const isCurrentUser = member.userId === currentUserId

                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            {member.user.image ? (
                              <AvatarImage
                                src={member.user.image}
                                alt={member.user.name}
                              />
                            ) : null}
                            <AvatarFallback>
                              {memberInitials(
                                member.user.name,
                                member.user.email
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {member.user.name || "Unnamed member"}
                            </p>
                            {isCurrentUser ? (
                              <p className="text-muted-foreground text-xs">
                                You
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.user.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(member.createdAt)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-sm">
              No members loaded for this workspace yet.
            </p>
          )}
        </section>

        <Separator />

        <section className="space-y-4">
          <SectionHeading
            title="Your workspaces"
            description={`You are a member of ${workspaceCount} workspace${workspaceCount === 1 ? "" : "s"}.`}
          />
          <div className="space-y-3">
            {organizations?.map((org) => {
              const isActive = org.id === activeOrganization?.id

              return (
                <div
                  key={org.id}
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium">{org.name}</p>
                      {isActive ? (
                        <Badge variant="default">Active</Badge>
                      ) : null}
                    </div>
                    <p className="text-muted-foreground truncate text-sm">
                      {org.slug}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Created {formatDate(org.createdAt)}
                    </p>
                  </div>
                  {!isActive ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={switchingOrgId === org.id}
                      onClick={() => handleSwitchWorkspace(org.id)}
                    >
                      {switchingOrgId === org.id ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Switching...
                        </>
                      ) : (
                        "Switch"
                      )}
                    </Button>
                  ) : null}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="mx-0 max-w-xl space-y-10 pb-12">
      <section className="space-y-4">
        <SectionHeading
          title="Create workspace"
          description="Set up a workspace to collaborate with your team."
        />
        <form onSubmit={handleCreate} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
              <Input
                id="workspace-name"
                placeholder="Acme Inc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isCreating}
                autoComplete="organization"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="workspace-slug">Workspace URL</FieldLabel>
              <FieldDescription>
                Used in links and integrations. Only lowercase letters,
                numbers, and hyphens.
              </FieldDescription>
              <Input
                id="workspace-slug"
                placeholder="acme-inc"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(e.target.value)
                }}
                disabled={isCreating}
              />
            </Field>
          </FieldGroup>
          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          <Button type="submit" disabled={isCreating}>
            {isCreating ? (
              <>
                <Loader2 className="animate-spin" />
                Creating...
              </>
            ) : (
              "Create workspace"
            )}
          </Button>
        </form>
      </section>
    </div>
  )
}
