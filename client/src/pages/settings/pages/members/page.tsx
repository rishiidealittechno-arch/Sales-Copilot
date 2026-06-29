import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link02Icon, Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const INVITE_URL =
  "https://app.example.com/join/ws_7k2m9n/invite?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

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
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default function MembersSettingsPage() {
  const [copied, setCopied] = useState(false)
  const [inviteEmails, setInviteEmails] = useState("")
  const [role, setRole] = useState("member")
  const [search, setSearch] = useState("")

  const copyInvite = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INVITE_URL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  return (
    <div className="mx-0 max-w-xl space-y-10 pb-12">
      <section className="space-y-4">
        <SectionHeading
          title="Invite by link"
          description="Share this link to invite users to join your workspace"
        />
        <div className="flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-stretch">
          <Input
            readOnly
            value={INVITE_URL}
            aria-label="Invite link"
          />
          <Button
            type="button"
            onClick={copyInvite}
          >
            {copied ? "Copied" : "Copy link"}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title="Invite by email"
          description="Send an invite email to your team"
        />
        <div className="flex max-w-3xl flex-col gap-3 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1 space-y-2">
            <label htmlFor="invite-emails" className="sr-only">
              Email addresses
            </label>
            <Input
              id="invite-emails"
              placeholder="tim@apple.com, jony.ive@apple.dev"
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-end lg:w-auto">
            <div className="">
              <label htmlFor="default-role" className="sr-only">
                Default role
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="default-role" className="h-10 w-full rounded-lg">
                  <SelectValue placeholder="Default role" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size={'sm'}>
              Invite
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title="Manage members"
          description="Manage the members of your workspace here"
        />
        <Card className="ring-0 shadow-none rounded-none p-0 ">
          <CardContent className="p-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <InputGroup>
                <InputGroupAddon align="inline-start" className="pl-3">
                  <HugeiconsIcon
                    icon={Search}
                    strokeWidth={2}
                    className="text-muted-foreground size-4"
                  />
                </InputGroupAddon>
                <InputGroupInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search a team member..."
                  className="h-10 py-2"
                  aria-label="Search members"
                />
              </InputGroup>
              <Button
                type="button"
                variant="outline"
                size="sm"
              >
                <HugeiconsIcon icon={Link02Icon} strokeWidth={2} className="size-4" />
                Open
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
