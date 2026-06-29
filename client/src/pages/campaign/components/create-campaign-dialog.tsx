import { type ReactNode, useId, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function CreateCampaignDialog() {
  const formId = useId()
  const [open, setOpen] = useState(false)

  const [campaignTitle, setCampaignTitle] = useState("")
  const [campaignDescription, setCampaignDescription] = useState("")
  /** When true, enabled channels run concurrently; when false, batch / staged sends. */
  const [isConcurrent, setIsConcurrent] = useState(true)

  const [emailEnabled, setEmailEnabled] = useState(false)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [pushEnabled, setPushEnabled] = useState(false)

  const [emailSubject, setEmailSubject] = useState("")
  const [emailHeadline, setEmailHeadline] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [smsBody, setSmsBody] = useState("")
  const [pushTitle, setPushTitle] = useState("")
  const [pushBody, setPushBody] = useState("")

  function reset() {
    setCampaignTitle("")
    setCampaignDescription("")
    setIsConcurrent(true)
    setEmailEnabled(false)
    setSmsEnabled(false)
    setPushEnabled(false)
    setEmailSubject("")
    setEmailHeadline("")
    setEmailBody("")
    setSmsBody("")
    setPushTitle("")
    setPushBody("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    reset()
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) reset()
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Create campaign
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="flex max-h-[min(90vh,720px)] max-w-lg flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col h-[-webkit-fill-available] overflow-hidden"
          >
            <DialogHeader className="shrink-0 space-y-1 border-b border-border/60 px-6 py-4 text-left">
              <DialogTitle>Create campaign</DialogTitle>
              <DialogDescription>
                Name your campaign, then enable one or more channels. Each
                channel expands so you can configure content when it is on.
              </DialogDescription>
            </DialogHeader>

            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-4">
              <div className="space-y-3">
                <div className="grid gap-2">
                  <label
                    htmlFor={`${formId}-campaign-title`}
                    className="text-sm font-medium"
                  >
                    Campaign title
                  </label>
                  <Input
                    id={`${formId}-campaign-title`}
                    value={campaignTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                    placeholder="e.g. Spring reactivation"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor={`${formId}-campaign-desc`}
                    className="text-sm font-medium"
                  >
                    Campaign description
                  </label>
                  <Textarea
                    id={`${formId}-campaign-desc`}
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                    placeholder="What this send is for and who it targets."
                    className="min-h-20 resize-y"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 rounded-xl border border-border/80 bg-muted/15 p-4">
                  <div className="min-w-0 space-y-1.5 pr-2">
                    <p
                      id={`${formId}-waterfall-label`}
                      className="text-sm font-medium leading-none"
                    >
                      Waterfall delivery
                    </p>
                    <p
                      id={`${formId}-waterfall-desc`}
                      className="text-muted-foreground text-xs leading-relaxed"
                    >
                      {isConcurrent
                        ? "Enabled channels will send concurrently—all active channels run at the same time."
                        : "Batch mode: sends are grouped and released in staggered waves to control load and pacing."}
                    </p>
                  </div>
                  <Switch
                    checked={isConcurrent}
                    onCheckedChange={setIsConcurrent}
                    aria-labelledby={`${formId}-waterfall-label`}
                    aria-describedby={`${formId}-waterfall-desc`}
                    className="shrink-0"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <p className="text-sm font-medium">Channels</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Turn on a channel to include it in this campaign and open its
                  settings. At least one channel should be enabled before you
                  launch.
                </p>

                <ChannelBlock
                  enabled={emailEnabled}
                  onEnabledChange={setEmailEnabled}
                  title="Email"
                  description="Send HTML or rich text to subscribed addresses. Best for longer content and branding."
                >
                  <div className="grid gap-3 pt-1">
                    <div className="grid gap-2">
                      <label
                        htmlFor={`${formId}-email-subject`}
                        className="text-sm font-medium"
                      >
                        Subject
                      </label>
                      <Input
                        id={`${formId}-email-subject`}
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Email subject line"
                        autoComplete="off"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor={`${formId}-email-headline`}
                        className="text-sm font-medium"
                      >
                        Preview title
                      </label>
                      <Input
                        id={`${formId}-email-headline`}
                        value={emailHeadline}
                        onChange={(e) => setEmailHeadline(e.target.value)}
                        placeholder="Headline or inbox preview text"
                        autoComplete="off"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor={`${formId}-email-body`}
                        className="text-sm font-medium"
                      >
                        Email body
                      </label>
                      <Textarea
                        id={`${formId}-email-body`}
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder="Write your email content…"
                        className="min-h-28 resize-y"
                      />
                    </div>
                  </div>
                </ChannelBlock>

                <ChannelBlock
                  enabled={smsEnabled}
                  onEnabledChange={setSmsEnabled}
                  title="SMS"
                  description="Short transactional or promotional copy to opted-in phone numbers. Keep under carrier limits."
                >
                  <div className="grid gap-2 pt-1">
                    <label
                      htmlFor={`${formId}-sms-body`}
                      className="text-sm font-medium"
                    >
                      Message
                    </label>
                    <Textarea
                      id={`${formId}-sms-body`}
                      value={smsBody}
                      onChange={(e) => setSmsBody(e.target.value)}
                      placeholder="SMS message…"
                      className="min-h-28 resize-y"
                    />
                  </div>
                </ChannelBlock>

                <ChannelBlock
                  enabled={pushEnabled}
                  onEnabledChange={setPushEnabled}
                  title="Push"
                  description="Mobile or web push notifications. Short titles and body work best for engagement."
                >
                  <div className="grid gap-3 pt-1">
                    <div className="grid gap-2">
                      <label
                        htmlFor={`${formId}-push-title`}
                        className="text-sm font-medium"
                      >
                        Notification title
                      </label>
                      <Input
                        id={`${formId}-push-title`}
                        value={pushTitle}
                        onChange={(e) => setPushTitle(e.target.value)}
                        placeholder="Short title"
                        autoComplete="off"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor={`${formId}-push-body`}
                        className="text-sm font-medium"
                      >
                        Message
                      </label>
                      <Textarea
                        id={`${formId}-push-body`}
                        value={pushBody}
                        onChange={(e) => setPushBody(e.target.value)}
                        placeholder="Push body text…"
                        className="min-h-24 resize-y"
                      />
                    </div>
                  </div>
                </ChannelBlock>
              </div>
            </div>

            <DialogFooter className="shrink-0 border-t border-border/60 bg-muted/20 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create campaign</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

function ChannelBlock({
  enabled,
  onEnabledChange,
  title,
  description,
  children,
}: {
  enabled: boolean
  onEnabledChange: (v: boolean) => void
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Collapsible open={enabled} onOpenChange={onEnabledChange}>
      <div
        className={cn(
          "rounded-xl border border-border/80 bg-muted/20 p-4 transition-colors",
          enabled && "border-border bg-muted/30"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{title}</p>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {description}
            </p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={onEnabledChange}
            aria-label={`Enable ${title}`}
            className="shrink-0"
          />
        </div>
        <CollapsibleContent>
          <div className="border-border/60 mt-4 border-t pt-4">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
