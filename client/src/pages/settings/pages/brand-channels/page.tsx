import { useId, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function BrandChannelsSettingsPage() {
  const formId = useId()

  const [emailFromName, setEmailFromName] = useState("Acme Gaming")
  const [emailFrom, setEmailFrom] = useState("hello@mail.acmegaming.example")
  const [emailReplyTo, setEmailReplyTo] = useState("support@acmegaming.example")
  const [emailFooter, setEmailFooter] = useState(
    "Acme Gaming Ltd., 100 Example Street, London. {{unsubscribe_link}}\n\nYou received this because you have an account with us."
  )

  const [smsSenderId, setSmsSenderId] = useState("ACMEPLAY")
  const [smsRegion, setSmsRegion] = useState("US")
  const [smsHelpText, setSmsHelpText] = useState(
    "Reply STOP to opt out. Msg & data rates may apply. Help: help@acmegaming.example"
  )

  const [pushAppName, setPushAppName] = useState("Acme Play")
  const [pushFcmKey, setPushFcmKey] = useState("AAAA-demo-fcm-key-replace-me")
  const [pushApnsTeamId, setPushApnsTeamId] = useState("A1B2C3D4E5")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="mx-start max-w-xl space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Brand channels</h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Set how your workspace appears on outbound email, SMS, and push. These
          defaults apply to campaigns and journeys unless you override them per
          send.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-0">
        <section className="space-y-4 pb-8" aria-labelledby={`${formId}-email-heading`}>
          <div className="space-y-1">
            <h3
              id={`${formId}-email-heading`}
              className="text-base font-semibold tracking-tight"
            >
              Email
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Default sender identity and footer for marketing and transactional
              email.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2 sm:col-span-2">
              <label
                htmlFor={`${formId}-email-from-name`}
                className="text-sm font-medium"
              >
                From name
              </label>
              <Input
                id={`${formId}-email-from-name`}
                value={emailFromName}
                onChange={(e) => setEmailFromName(e.target.value)}
                placeholder="e.g. Acme Casino"
                autoComplete="organization"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor={`${formId}-email-from`}
                className="text-sm font-medium"
              >
                From address
              </label>
              <Input
                id={`${formId}-email-from`}
                type="email"
                value={emailFrom}
                onChange={(e) => setEmailFrom(e.target.value)}
                placeholder="news@mail.example.com"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor={`${formId}-email-reply`}
                className="text-sm font-medium"
              >
                Reply-to
              </label>
              <Input
                id={`${formId}-email-reply`}
                type="email"
                value={emailReplyTo}
                onChange={(e) => setEmailReplyTo(e.target.value)}
                placeholder="support@example.com"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <label
                htmlFor={`${formId}-email-footer`}
                className="text-sm font-medium"
              >
                Default footer
              </label>
              <Textarea
                id={`${formId}-email-footer`}
                value={emailFooter}
                onChange={(e) => setEmailFooter(e.target.value)}
                placeholder="Company address, unsubscribe link merge tag, legal text…"
                className="min-h-24 resize-y"
              />
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4 py-8" aria-labelledby={`${formId}-sms-heading`}>
          <div className="space-y-1">
            <h3
              id={`${formId}-sms-heading`}
              className="text-base font-semibold tracking-tight"
            >
              SMS
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Branding and compliance copy for SMS sends in your default region.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 items-start">
            <div className="grid gap-2">
              <label
                htmlFor={`${formId}-sms-sender`}
                className="text-sm font-medium"
              >
                Sender ID / alpha tag
              </label>
              <Input
                id={`${formId}-sms-sender`}
                value={smsSenderId}
                onChange={(e) => setSmsSenderId(e.target.value)}
                placeholder="ACME"
                maxLength={11}
                autoComplete="off"
              />
              <p className="text-muted-foreground text-xs">
                Alphanumeric or short code depending on region and carrier rules.
              </p>
            </div>
            <div className="grid gap-2">
              <label
                htmlFor={`${formId}-sms-region`}
                className="text-sm font-medium"
              >
                Default region
              </label>
              <Input
                id={`${formId}-sms-region`}
                value={smsRegion}
                onChange={(e) => setSmsRegion(e.target.value)}
                placeholder="e.g. US, GB, AU"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <label
                htmlFor={`${formId}-sms-help`}
                className="text-sm font-medium"
              >
                Opt-out / help text
              </label>
              <Textarea
                id={`${formId}-sms-help`}
                value={smsHelpText}
                onChange={(e) => setSmsHelpText(e.target.value)}
                placeholder="Reply STOP to unsubscribe…"
                className="min-h-20 resize-y"
              />
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4 py-8" aria-labelledby={`${formId}-push-heading`}>
          <div className="space-y-1">
            <h3
              id={`${formId}-push-heading`}
              className="text-base font-semibold tracking-tight"
            >
              Push
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Mobile identifiers and credentials used for Android and iOS
              delivery.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label
                htmlFor={`${formId}-push-app`}
                className="text-sm font-medium"
              >
                App display name
              </label>
              <Input
                id={`${formId}-push-app`}
                value={pushAppName}
                onChange={(e) => setPushAppName(e.target.value)}
                placeholder="Shown in notification settings on device"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor={`${formId}-push-fcm`}
                className="text-sm font-medium"
              >
                FCM server key (Android)
              </label>
              <Input
                id={`${formId}-push-fcm`}
                type="password"
                value={pushFcmKey}
                onChange={(e) => setPushFcmKey(e.target.value)}
                placeholder="••••••••"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor={`${formId}-push-apns`}
                className="text-sm font-medium"
              >
                Apple Team ID (iOS)
              </label>
              <Input
                id={`${formId}-push-apns`}
                value={pushApnsTeamId}
                onChange={(e) => setPushApnsTeamId(e.target.value)}
                placeholder="10-character Team ID"
                autoComplete="off"
              />
              <p className="text-muted-foreground text-xs">
                Upload certificates and keys in your mobile CI; this ID links
                the workspace to the correct Apple team.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <div className="flex justify-end pt-6">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  )
}
