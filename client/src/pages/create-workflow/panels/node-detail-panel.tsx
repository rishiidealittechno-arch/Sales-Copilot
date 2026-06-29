import { Panel, type Node } from "@xyflow/react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { JourneyStepNodePanel } from "./journey-step-node-panel"
import { PlusNodePanel } from "./plus-node-panel"
import { TriggerNodePanel } from "./trigger-node-panel"

type NodeDetailPanelProps = {
  node: Node | null
  onClose: () => void
}

function panelTitle(node: Node): string {
  switch (node.type) {
    case "trigger":
      return "Trigger"
    case "journeyStep":
      return "Journey step"
    case "plus":
      return "Add step"
    default:
      return "Node"
  }
}

function panelDescription(node: Node): string {
  switch (node.type) {
    case "trigger":
      return "Define how subscribers enter this journey."
    case "journeyStep":
      return "Review and edit this step."
    case "plus":
      return "Insert a new step after this point."
    default:
      return ""
  }
}

function NodeDetailPanelBody({ node }: { node: Node }) {
  switch (node.type) {
    case "trigger":
      return <TriggerNodePanel node={node} />
    case "journeyStep":
      return <JourneyStepNodePanel node={node} />
    case "plus":
      return <PlusNodePanel node={node} />
    default:
      return (
        <p className="text-muted-foreground text-sm">
          No panel is configured for this node type.
        </p>
      )
  }
}

export function NodeDetailPanel({ node, onClose }: NodeDetailPanelProps) {
  if (!node) {
    return null
  }

  return (
    <Panel
      position="top-right"
      className={cn(
        "nodrag nopan",
        "bg-popover text-popover-foreground m-3 flex w-[min(100vw-24px,24rem)] flex-col overflow-hidden rounded-lg border shadow-lg",
        "h-full max-h-[calc(100%-24px)] [height:-webkit-fill-available]",
      )}
    >
      <div className="flex shrink-0 items-start justify-between gap-2 border-b p-4">
        <div className="min-w-0 flex-1 space-y-0.5">
          <h2 className="font-heading text-base font-medium text-foreground">
            {panelTitle(node)}
          </h2>
          <p className="text-muted-foreground text-sm">{panelDescription(node)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          type="button"
          onClick={onClose}
          aria-label="Close panel"
        >
          <XIcon className="size-4" />
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <NodeDetailPanelBody node={node} />
      </div>
    </Panel>
  )
}
