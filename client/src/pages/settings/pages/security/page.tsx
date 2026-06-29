import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function SecuritySettingsPage() {
  const [requireMfa, setRequireMfa] = useState(true)
  const [ssoEnforced, setSsoEnforced] = useState(false)
  const [auditExports, setAuditExports] = useState(true)

  return (
    <div className="mx-start max-w-xl space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Security</h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Authentication, SSO, sessions, and audit controls for this workspace.
          Changes here apply to all members unless noted.
        </p>
      </div>

      <section className="space-y-6" aria-labelledby="security-auth-heading">
        <h3
          id="security-auth-heading"
          className="text-base font-semibold tracking-tight"
        >
          Authentication
        </h3>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 pr-4">
            <label
              htmlFor="require-mfa"
              className="text-sm font-medium leading-none"
            >
              Require MFA for all members
            </label>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Users must enroll a second factor before accessing the workspace.
              Recommended for production workspaces.
            </p>
          </div>
          <Switch
            id="require-mfa"
            checked={requireMfa}
            onCheckedChange={setRequireMfa}
            className="shrink-0"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Authenticator apps (TOTP)
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Time-based one-time codes via Google Authenticator, 1Password,
              etc.
            </p>
          </div>
          <Badge variant="secondary" className="w-fit font-normal">
            Enabled
          </Badge>
        </div>
      </section>

      <Separator />

      <section className="space-y-4" aria-labelledby="security-sso-heading">
        <h3
          id="security-sso-heading"
          className="text-base font-semibold tracking-tight"
        >
          Single sign-on (SSO)
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Connect your IdP so members sign in with your corporate directory.
          SAML 2.0 is supported.
        </p>

        <div className="flex flex-col gap-4 rounded-lg border border-border/80 bg-muted/15 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
            <p className="text-sm font-medium">SAML connection</p>
            <Badge variant="outline" className="font-normal">
              Configured
            </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Last tested: Feb 12, 2026 · acme.okta.com
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm">
              Edit SSO
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 pr-4">
            <label
              htmlFor="sso-enforced"
              className="text-sm font-medium leading-none"
            >
              Enforce SSO only
            </label>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Disable password login for workspace members. Requires working
              SSO before turning on.
            </p>
          </div>
          <Switch
            id="sso-enforced"
            checked={ssoEnforced}
            onCheckedChange={setSsoEnforced}
            className="shrink-0"
          />
        </div>
      </section>

      <Separator />

      <section className="space-y-4" aria-labelledby="security-session-heading">
        <h3
          id="security-session-heading"
          className="text-base font-semibold tracking-tight"
        >
          Sessions
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Idle sessions expire automatically. Active users may need to sign in
          again after the timeout.
        </p>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Idle timeout</dt>
            <dd className="font-medium">12 hours</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Max session length</dt>
            <dd className="font-medium">7 days</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm">
            Edit session policy
          </Button>
          <Button type="button" variant="outline" size="sm">
            Sign out all sessions
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-4" aria-labelledby="security-audit-heading">
        <h3
          id="security-audit-heading"
          className="text-base font-semibold tracking-tight"
        >
          Audit log
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Administrative actions, API key changes, and login events are
          retained for compliance review.
        </p>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Retention</dt>
            <dd className="font-medium">400 days (plan default)</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Export format</dt>
            <dd className="font-medium">JSON / CSV</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 pr-4">
            <label
              htmlFor="audit-exports"
              className="text-sm font-medium leading-none"
            >
              Allow admins to export audit logs
            </label>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Owners and admins can download logs from the audit viewer.
            </p>
          </div>
          <Switch
            id="audit-exports"
            checked={auditExports}
            onCheckedChange={setAuditExports}
            className="shrink-0"
          />
        </div>

        <Button type="button" variant="outline" size="sm">
          Open audit log
        </Button>
      </section>
    </div>
  )
}
