import { CancelIcon, Clock01Icon, FilterIcon, Mail01Icon, MessageIcon, PlusSignIcon, WorkflowCircleIcon } from '@hugeicons/core-free-icons';
import { memo, useCallback } from "react"
import {
  Handle,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"

import { WORKFLOW_STEP_GAP_Y } from "../utils/workflow-layout"

export type PlusNodeData = {
  /** Auto-created plus: open branch on this node id (see ensure-downstream-plus-nodes). */
  downstreamOf?: string
  branchSlot?: "yes" | "no"
  /** Called when the user picks a step type from the menu (wire from the canvas parent). */
  onAddStep?: (kind: PlusStepKind) => void
}

export type PlusStepKind =
  | "email"
  | "sms"
  | "push"
  | "delay"
  | "branch"
  | "split"
  | "tag"
  | "webhook"
  | "end"

type PlusFlowNode = Node<PlusNodeData, "plus">

function newNodeId() {
  return `node-${globalThis.crypto?.randomUUID?.() ?? String(Date.now())}`
}

function nodeSpecForKind(
  kind: PlusStepKind,
): Pick<Node, "type" | "data"> {
  switch (kind) {
    case "email":
      return { type: "emailNode", data: {} }
    case "sms":
      return { type: "smsNode", data: {} }
    case "delay":
      return { type: "waitNode", data: {} }
    case "branch":
      return { type: "conditionNode", data: { stepKind: "condition" as const } }
    case "split":
      return { type: "conditionNode", data: { stepKind: "filter" as const } }
    case "push":
    case "tag":
    case "webhook":
      return { type: "actionNode", data: { stepKind: kind } }
    case "end":
      return { type: "endNode", data: {} }
  }
}

function PlusNode({ id, data }: NodeProps<PlusFlowNode>) {
  const { getNode, getEdges, setNodes, setEdges } = useReactFlow()

  const addStep = useCallback(
    (kind: PlusStepKind) => {
      const plus = getNode(id)
      if (!plus) return

      data.onAddStep?.(kind)

      const newId = newNodeId()

      /** Terminal step: replace this plus with an end node (no edge after end). */
      if (kind === "end") {
        setNodes((nodes) => [
          ...nodes.filter((n) => n.id !== id),
          {
            id: newId,
            type: "endNode",
            position: { ...plus.position },
            data: {},
          },
        ])
        setEdges((edges) =>
          edges.map((e) =>
            e.target === id
              ? { ...e, id: `${e.source}-${newId}`, target: newId }
              : e,
          ),
        )
        return
      }

      const { type, data: nodeData } = nodeSpecForKind(kind)

      const incomingToPlus = getEdges().filter((e) => e.target === id)
      const parent = incomingToPlus[0]
        ? getNode(incomingToPlus[0].source)
        : undefined

      /** Keep the plus column (same x as this plus) so branches stay aligned with their slot. */
      const columnX = plus.position.x
      const newY = parent
        ? parent.position.y + WORKFLOW_STEP_GAP_Y
        : plus.position.y - WORKFLOW_STEP_GAP_Y
      const plusY = parent
        ? parent.position.y + 2 * WORKFLOW_STEP_GAP_Y
        : plus.position.y

      const newNode: Node = {
        id: newId,
        type,
        position: { x: columnX, y: newY },
        data: nodeData,
      }

      setNodes((nodes) => [
        ...nodes.map((n) =>
          n.id === id
            ? {
                ...n,
                position: { x: columnX, y: plusY },
                data: {
                  ...n.data,
                  downstreamOf: newId,
                },
              }
            : n,
        ),
        newNode,
      ])
      setEdges((edges) => {
        const incoming = edges.filter((e) => e.target === id)
        const rest = edges.filter((e) => e.target !== id)
        const retargeted = incoming.map((e) => ({
          ...e,
          id: `${e.source}-${newId}`,
          target: newId,
        }))
        return [
          ...rest,
          ...retargeted,
          {
            id: `${newId}-${id}`,
            source: newId,
            target: id,
            animated: true,
            // type: "edgeButton",
          },
        ]
      })
    },
    [data, getEdges, getNode, id, setEdges, setNodes],
  )

  return (
    <div className="relative flex flex-col items-center">
      <Handle
        type="target"
        position={Position.Top}
        className="opacity-0"
      />

      <div className="nodrag nopan">
      <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" type="button" size="icon-xs">
                                    <HugeiconsIcon icon={PlusSignIcon} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="z-[200]">
                            <DropdownMenuGroup>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem
                                        onSelect={() => addStep("email")}
                                      >
                                            <HugeiconsIcon icon={Mail01Icon} />
                                            Email
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onSelect={() => addStep("delay")}
                                    >
                                        <HugeiconsIcon icon={Clock01Icon} />
                                        Wait</DropdownMenuItem>
                                    <DropdownMenuItem
                                    disabled
                                      onSelect={() => addStep("branch")}
                                    >
                                        <HugeiconsIcon icon={WorkflowCircleIcon} />
                                        Condition</DropdownMenuItem>
                                    <DropdownMenuItem
                                    disabled
                                      onSelect={() => addStep("split")}
                                    >
                                        <HugeiconsIcon icon={FilterIcon} />
                                        Filter</DropdownMenuItem>
                                    <DropdownMenuItem
                                      onSelect={() => addStep("sms")}
                                    >
                                        <HugeiconsIcon icon={MessageIcon} />
                                        SMS
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onSelect={() => addStep("end")}
                                    >
                                        <HugeiconsIcon icon={CancelIcon} />
                                        End
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </DropdownMenuGroup>
                                <DropdownMenuItem variant="destructive">
                                    <span>Delete</span>
                                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
      </div>
    </div>
  )
}

export default memo(PlusNode)
