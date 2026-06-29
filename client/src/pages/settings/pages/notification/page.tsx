import { useState } from "react"

import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

type NotificationPrefs = {
  emailProductUpdates: boolean
  emailMarketing: boolean
  emailWeeklyDigest: boolean
  emailSecurityAlerts: boolean
  pushCampaignAlerts: boolean
  pushJourneyMilestones: boolean
  slackDigest: boolean
  slackIncidents: boolean
  inAppMentions: boolean
  inAppComments: boolean
}

const defaultPrefs: NotificationPrefs = {
  emailProductUpdates: true,
  emailMarketing: false,
  emailWeeklyDigest: true,
  emailSecurityAlerts: true,
  pushCampaignAlerts: true,
  pushJourneyMilestones: false,
  slackDigest: false,
  slackIncidents: true,
  inAppMentions: true,
  inAppComments: false,
}

function NotificationRow({
  id,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  id: string
  title: string
  description: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1 pr-4">
        <label
          htmlFor={id}
          className="cursor-pointer text-sm leading-none font-medium"
        >
          {title}
        </label>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="shrink-0"
      />
    </div>
  )
}

export default function NotificationSettingsPage() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(defaultPrefs)

  const set = (key: keyof NotificationPrefs) => (v: boolean) =>
    setPrefs((p) => ({ ...p, [key]: v }))

  return (
    <div className="space-y-8 mx-start max-w-xl">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Choose how we reach you about product news, campaigns, and incidents.
          Security alerts are recommended on at least one channel.
        </p>
      </div>

      <div className="space-y-6">
        <div className="mt-8">
          <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wide uppercase">
            Email
          </h3>
          <div className="space-y-6">
            <NotificationRow
              id="email-product"
              title="Product updates"
              description="Release notes, new features, and deprecations that affect your workspace."
              checked={prefs.emailProductUpdates}
              onCheckedChange={set("emailProductUpdates")}
            />
            <Separator />
            <NotificationRow
              id="email-marketing"
              title="Marketing & events"
              description="Invitations to webinars, best-practice content, and occasional promotions."
              checked={prefs.emailMarketing}
              onCheckedChange={set("emailMarketing")}
            />
            <Separator />
            <NotificationRow
              id="email-digest"
              title="Weekly digest"
              description="A summary of key metrics and activity across campaigns and journeys."
              checked={prefs.emailWeeklyDigest}
              onCheckedChange={set("emailWeeklyDigest")}
            />
            <Separator />
            <NotificationRow
              id="email-security"
              title="Security alerts"
              description="Login anomalies, API key changes, and policy updates that impact access."
              checked={prefs.emailSecurityAlerts}
              onCheckedChange={set("emailSecurityAlerts")}
            />
          </div>
        </div>

        <Separator className="my-2" />

        <div className="mt-8">
          <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wide uppercase">
            Push
          </h3>
          <div className="space-y-6">
            <NotificationRow
              id="push-campaign"
              title="Campaign alerts"
              description="When a send completes, fails, or crosses a guardrail you configured."
              checked={prefs.pushCampaignAlerts}
              onCheckedChange={set("pushCampaignAlerts")}
            />
            <Separator />
            <NotificationRow
              id="push-journey"
              title="Journey milestones"
              description="Notable volume or completion shifts in live journeys."
              checked={prefs.pushJourneyMilestones}
              onCheckedChange={set("pushJourneyMilestones")}
            />
          </div>
        </div>

        <Separator className="my-2" />

        <div className="mt-8">
          <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wide uppercase">
            Slack
          </h3>
          <div className="space-y-6">
            <NotificationRow
              id="slack-digest"
              title="Daily digest to channel"
              description="Post a compact stats snapshot to the connected Slack channel."
              checked={prefs.slackDigest}
              onCheckedChange={set("slackDigest")}
            />
            <Separator />
            <NotificationRow
              id="slack-incidents"
              title="Incident & error spikes"
              description="Webhook failures, pipeline errors, and elevated API error rates."
              checked={prefs.slackIncidents}
              onCheckedChange={set("slackIncidents")}
            />
          </div>
        </div>

        <Separator className="my-2" />

        <div className="mt-8">
          <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wide uppercase">
            In-app
          </h3>
          <div className="space-y-6">
            <NotificationRow
              id="inapp-mentions"
              title="Mentions"
              description="When someone @mentions you in comments or shared reports."
              checked={prefs.inAppMentions}
              onCheckedChange={set("inAppMentions")}
            />
            <Separator />
            <NotificationRow
              id="inapp-comments"
              title="Comments on your assets"
              description="Replies on dashboards, segments, or campaigns you own."
              checked={prefs.inAppComments}
              onCheckedChange={set("inAppComments")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
