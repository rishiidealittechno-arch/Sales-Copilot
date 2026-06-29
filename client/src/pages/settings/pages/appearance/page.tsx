import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
  applyThemeColors,
  PRIMARY_COLOR_OPTIONS,
  THEME_PRIMARY_STORAGE_KEY,
} from "@/lib/theme-colors"
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import { getLanguageSelectOptions } from "./language-options"

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme()
  const languageOptions = useMemo(() => getLanguageSelectOptions(), [])
  const [language, setLanguage] = useState("en")
  const [primaryColor, setPrimaryColor] = useState<string | null>(() =>
    localStorage.getItem(THEME_PRIMARY_STORAGE_KEY)
  )

  const selectPrimaryColor = (color: string) => {
    localStorage.setItem(THEME_PRIMARY_STORAGE_KEY, color)
    setPrimaryColor(color)
    applyThemeColors({ primary: color })
  }

  useEffect(() => {
    if (
      languageOptions.length > 0 &&
      !languageOptions.some((o) => o.value === language)
    ) {
      const fallback =
        languageOptions.find(
          (o) => o.value === "en" || o.value.startsWith("en-")
        ) ?? languageOptions[0]
      setLanguage(fallback.value)
    }
  }, [language, languageOptions])

  return (
    <div className="mx-0 max-w-xl space-y-10 pb-12">

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-medium">Theme</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Choose how the interface looks.
          </p>
        </div>
        <RadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
          className="grid grid-cols-3 gap-4"
        >
          <FieldLabel className="relative h-32" htmlFor="theme-light">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Light</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="light" id="theme-light" />
            </Field>
            <div className="absolute bottom-0 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-t-md border bg-white dark:text-black p-2 ">Aa</div>
          </FieldLabel>
          <FieldLabel className="relative h-32" htmlFor="theme-dark">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Dark</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="dark" id="theme-dark" />
            </Field>
            <div className="absolute bottom-0 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-t-md border bg-zinc-900 text-white p-2">Aa</div>
          </FieldLabel>
          <FieldLabel className="relative h-32" htmlFor="theme-system">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>System</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="system" id="theme-system" />
            </Field>
            <div className="absolute bottom-0 left-1/2 flex h-20 w-2/3 -translate-x-1/2 overflow-hidden rounded-t-md">
              <div className="h-full w-1/2 shadow-lg p-2 text-black bg-white">Aa</div>
              <div className="h-full w-1/2 shadow-lg p-2 text-white bg-zinc-900">Aa</div>
            </div>
          </FieldLabel>
        </RadioGroup>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-medium">Language</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Select your preferred language
          </p>
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger size="default" className="h-10 w-full max-w-xl rounded-lg">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)]"
          >
            {languageOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <Separator />

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-medium">Theme Colors</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Configure the theme colors for the interface
          </p>
        </div>

        {/* Primary Colors */}
        <div className="space-y-2 flex flex-col gap-1 ">
          <label className="text-muted-foreground text-xs font-medium">
            Primary Color
          </label>

          <div className="flex flex-wrap gap-3">
            {PRIMARY_COLOR_OPTIONS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Set primary color to ${color}`}
                aria-pressed={primaryColor === color}
                onClick={() => selectPrimaryColor(color)}
                className={cn(
                  "size-10 rounded-full border border-border transition-all hover:scale-105",
                  primaryColor === color &&
                    "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Secondary Colors */}
        {/* <div className="space-y-2">
          <label className="text-muted-foreground text-xs font-medium">
            Secondary Color
          </label>

          <div className="flex flex-wrap gap-3">
            {SECONDARY_COLOR_OPTIONS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Set secondary color to ${color}`}
                aria-pressed={secondaryColor === color}
                onClick={() => selectSecondaryColor(color)}
                className={cn(
                  "size-10 rounded-full border border-border transition-all hover:scale-105",
                  secondaryColor === color &&
                    "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div> */}
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-sm font-medium">Formats</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Configure date, time, number, timezone, and calendar start day
          </p>
        </div>

        <div className="max-w-xl space-y-5">
          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="tz">
              Time zone
            </label>
            <Select defaultValue="ist">
              <SelectTrigger id="tz" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="ist">
                  System settings · (GMT+05:30) India Standard Time — Kolkata
                </SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="df">
              Date format
            </label>
            <Select defaultValue="sys-date">
              <SelectTrigger id="df" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sys-date">System settings · Apr 26, 2026</SelectItem>
                <SelectItem value="iso">2026-04-26</SelectItem>
                <SelectItem value="eu">26/04/2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="tf">
              Time format
            </label>
            <Select defaultValue="sys-time">
              <SelectTrigger id="tf" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sys-time">System settings · 5:08 PM</SelectItem>
                <SelectItem value="24">17:08</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="nf">
              Number format
            </label>
            <Select defaultValue="sys-num">
              <SelectTrigger id="nf" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sys-num">System settings · 1,234.56</SelectItem>
                <SelectItem value="eu-num">1.234,56</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground text-xs font-medium" htmlFor="csd">
              Calendar start day
            </label>
            <Select defaultValue="sun">
              <SelectTrigger id="csd" className="h-10 w-full rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sun">System settings · Sunday</SelectItem>
                <SelectItem value="mon">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  )
}
