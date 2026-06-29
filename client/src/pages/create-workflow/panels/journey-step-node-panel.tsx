import type { Node } from "@xyflow/react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type JourneyStepNodePanelProps = {
  node: Node
}

export function JourneyStepNodePanel({ node }: JourneyStepNodePanelProps) {
  const data = (node.data ?? {}) as { kind?: string; label?: string }

  return (
    <div className="flex flex-col gap-6 px-1">
      <div className="flex flex-col gap-2">
        <Label>Step type</Label>
        <p className="text-sm font-medium">{data.kind ?? "Journey step"}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`step-label-${node.id}`}>Label</Label>
        <Input id={`step-label-${node.id}`} defaultValue={data.label ?? ""} readOnly />
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Edit step content and behavior in the full step editor when wired to your
        backend.
      </p>
    </div>
  )
}
