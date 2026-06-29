import type { Node } from "@xyflow/react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TriggerNodePanelProps = {
  node: Node
}

export function TriggerNodePanel({ node }: TriggerNodePanelProps) {
  return (
    <div className="flex flex-col gap-6 px-1">
      <div className="flex flex-col gap-2">
        <Label htmlFor={`trigger-kind-${node.id}`}>How the journey starts</Label>
        <Select defaultValue="manual">
          <SelectTrigger id={`trigger-kind-${node.id}`} className="w-full">
            <SelectValue placeholder="Choose trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Launch manually</SelectItem>
            <SelectItem value="schedule">On a schedule</SelectItem>
            <SelectItem value="event">When an event occurs</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Configure when subscribers enter this journey. Changes apply when you save
        the journey.
      </p>
    </div>
  )
}
