import type { Node } from "@xyflow/react"

type PlusNodePanelProps = {
  node: Node
}

export function PlusNodePanel({ node }: PlusNodePanelProps) {
  return (
    <div className="flex flex-col gap-4 px-1">
      <p className="text-sm leading-relaxed">
        This node adds the next step to your journey. Use the{" "}
        <span className="font-medium">+</span> control on the canvas to choose email,
        delay, branching, and other step types.
      </p>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Node ID: <span className="font-mono">{node.id}</span>
      </p>
    </div>
  )
}
