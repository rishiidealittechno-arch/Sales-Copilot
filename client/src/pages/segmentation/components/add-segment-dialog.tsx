import { Fragment, useCallback, useId, useState } from "react"
import { Cancel01Icon, } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const FIELD_OPTIONS = [
  { value: "churn_score", label: "Churn score" },
  { value: "vip_tier", label: "VIP tier" },
  { value: "email", label: "Email" },
  { value: "country", label: "Country" },
  { value: "last_deposit", label: "Last deposit" },
  { value: "lifetime_value", label: "Lifetime value" },
  { value: "event_count_30d", label: "Events (30d)" },
] as const

const OPERATOR_OPTIONS = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not equals" },
  { value: "greater_than", label: "Greater than" },
  { value: "less_than", label: "Less than" },
  { value: "contains", label: "Contains" },
  { value: "is_empty", label: "Is empty" },
] as const

type FieldValue = (typeof FIELD_OPTIONS)[number]["value"]
type OperatorValue = (typeof OPERATOR_OPTIONS)[number]["value"]

type SegmentRule = {
  id: string
  field: FieldValue
  operator: OperatorValue
  value: string
}

function newDraftRule(): SegmentRule {
  return {
    id: crypto.randomUUID(),
    field: "churn_score",
    operator: "equals",
    value: "",
  }
}

function fieldLabel(field: FieldValue): string {
  return FIELD_OPTIONS.find((f) => f.value === field)?.label ?? field
}

function operatorPhrase(operator: OperatorValue): string {
  const phrases: Record<OperatorValue, string> = {
    equals: "equals",
    not_equals: "does not equal",
    greater_than: "is greater than",
    less_than: "is less than",
    contains: "contains",
    is_empty: "is empty",
  }
  return phrases[operator]
}

/** One readable clause, no trailing period (joined into a sentence below). */
function ruleSummaryClause(rule: SegmentRule): string {
  const name = fieldLabel(rule.field)
  if (rule.operator === "is_empty") {
    return `${name} is empty`
  }
  const v = rule.value.trim() || "…"
  const phrase = operatorPhrase(rule.operator)
  return `${name} ${phrase} ${v}`
}

export function AddSegmentDialog() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rules, setRules] = useState<SegmentRule[]>([])
  const [draft, setDraft] = useState<SegmentRule>(() => newDraftRule())
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null)

  const reset = useCallback(() => {
    setTitle("")
    setDescription("")
    setRules([])
    setDraft(newDraftRule())
    setEditingRuleId(null)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    reset()
  }

  function draftIsValid(): boolean {
    if (draft.operator === "is_empty") return true
    return draft.value.trim().length > 0
  }

  function commitRule() {
    if (!draftIsValid()) return

    if (editingRuleId) {
      setRules((list) =>
        list.map((r) =>
          r.id === editingRuleId
            ? {
                ...r,
                field: draft.field,
                operator: draft.operator,
                value: draft.value,
              }
            : r
        )
      )
    } else {
      setRules((list) => [
        ...list,
        {
          id: crypto.randomUUID(),
          field: draft.field,
          operator: draft.operator,
          value: draft.value,
        },
      ])
    }

    setDraft(newDraftRule())
    setEditingRuleId(null)
  }

  function removeRule(id: string) {
    setRules((r) => r.filter((x) => x.id !== id))
    if (editingRuleId === id) {
      setDraft(newDraftRule())
      setEditingRuleId(null)
    }
  }

  function loadRuleIntoDraft(rule: SegmentRule) {
    setDraft({
      id: rule.id,
      field: rule.field,
      operator: rule.operator,
      value: rule.value,
    })
    setEditingRuleId(rule.id)
  }

  const isEditing = editingRuleId !== null
  const commitLabel = isEditing ? "Update rule" : "Add rule"

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Add segment
      </Button>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (!o) reset()
        }}
      >
        <DialogContent className="flex max-h-[min(90dvh,720px)] max-w-lg flex-col gap-0 p-0 sm:max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="flex max-h-[inherit] flex-col overflow-hidden"
          >
            <DialogHeader className="border-border shrink-0 space-y-1 border-b px-6 py-4 text-left">
              <DialogTitle>New segment</DialogTitle>
              <DialogDescription>
                Define a title, description, and one or more rules. All rules
                must match (AND) for a player to enter the segment.
              </DialogDescription>
            </DialogHeader>

            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-4">
              <div className="space-y-2">
                <label htmlFor="segment-title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="segment-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. High-value purchasers"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="segment-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="segment-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Who belongs in this segment and why?"
                  rows={3}
                  className={cn(
                    "border-input/50 bg-input/50 placeholder:text-muted-foreground w-full resize-y rounded-3xl border px-3 py-2 text-sm outline-none",
                    "focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-3"
                  )}
                />
              </div>

              <div className="space-y-3">
                <span className="text-sm font-medium">Rules</span>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label
                      className="text-muted-foreground text-xs font-medium"
                      htmlFor={`${formId}-rule-field`}
                    >
                      Field
                    </label>
                    <Select
                      value={draft.field}
                      onValueChange={(v) =>
                        setDraft((d) => ({ ...d, field: v as FieldValue }))
                      }
                    >
                      <SelectTrigger
                        id={`${formId}-rule-field`}
                        size="sm"
                        className="w-full"
                      >
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        {FIELD_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="text-muted-foreground text-xs font-medium"
                      htmlFor={`${formId}-rule-op`}
                    >
                      Operator
                    </label>
                    <Select
                      value={draft.operator}
                      onValueChange={(v) =>
                        setDraft((d) => ({
                          ...d,
                          operator: v as OperatorValue,
                        }))
                      }
                    >
                      <SelectTrigger
                        id={`${formId}-rule-op`}
                        size="sm"
                        className="w-full"
                      >
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {OPERATOR_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-1">
                    <label
                      className="text-muted-foreground text-xs font-medium"
                      htmlFor={`${formId}-rule-value`}
                    >
                      Value
                    </label>
                    <Input
                      id={`${formId}-rule-value`}
                      value={draft.value}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, value: e.target.value }))
                      }
                      placeholder="e.g. 45"
                      disabled={draft.operator === "is_empty"}
                      autoComplete="off"
                      className="h-8"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={commitRule}
                    disabled={!draftIsValid()}
                  >
                    {commitLabel}
                  </Button>
                  {editingRuleId ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground h-auto px-0"
                      onClick={() => {
                        setDraft(newDraftRule())
                        setEditingRuleId(null)
                      }}
                    >
                      New rule (clear fields)
                    </Button>
                  ) : null}
                </div>

                {rules.length > 0 ? (
                  <div
                    className="border-border bg-muted/20 rounded-xl border p-3"
                    aria-label="Segment rules summary"
                  >
                    <p className="text-muted-foreground mb-2 text-xs font-medium">
                      All of the following (AND)
                    </p>
                    <p
                      className="text-foreground flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm leading-relaxed"
                      role="list"
                    >
                      {rules.map((rule, index) => {
                        const active = editingRuleId === rule.id
                        return (
                          <Fragment key={rule.id}>
                            {index > 0 ? (
                              <span
                                className="text-muted-foreground px-0.5 text-sm lowercase"
                                aria-hidden
                              >
                                and
                              </span>
                            ) : null}
                            <span
                              role="listitem"
                              className="group inline-flex max-w-full items-center gap-0.5"
                            >
                              <Badge
                                asChild
                                variant="secondary"
                                className={cn(
                                  "h-auto min-h-6 max-w-full items-start gap-1 rounded-2xl px-2.5 py-1 text-left text-xs font-normal whitespace-normal",
                                  active &&
                                    "ring-ring/30 ring-2 ring-offset-2 ring-offset-background"
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => loadRuleIntoDraft(rule)}
                                  className="text-left"
                                >
                                  {ruleSummaryClause(rule)}
                                </button>
                              </Badge>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                className="text-muted-foreground hover:text-destructive size-7 shrink-0 opacity-70 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeRule(rule.id)
                                }}
                                aria-label={`Remove rule: ${ruleSummaryClause(rule)}`}
                              >
                                <HugeiconsIcon
                                  icon={Cancel01Icon}
                                  className="size-4"
                                  strokeWidth={2}
                                />
                              </Button>
                              {index === rules.length - 1 ? (
                                <span
                                  className="text-foreground/80 pl-0.5 text-sm"
                                  aria-hidden
                                >
                                  .
                                </span>
                              ) : null}
                            </span>
                          </Fragment>
                        )
                      })}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    No rules yet. Set field, operator, and value, then use Add
                    rule. After rules appear here, click a line to load it for
                    editing.
                  </p>
                )}
              </div>
            </div>
            <DialogFooter className="border-border shrink-0 border-t px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create segment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
