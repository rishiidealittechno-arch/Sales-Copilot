import type { Edge, Node } from "@xyflow/react"

import { WORKFLOW_STEP_GAP_Y } from "./workflow-layout"

/** Slots that must have an outgoing edge (placeholder plus counts as filled). */
export type DownstreamSlot = "default" | "yes" | "no"

const SINGLE_SOURCE_TYPES = new Set([
  "trigger",
  "actionNode",
  "emailNode",
  "smsNode",
  "waitNode",
])

const CONDITION_TYPE = "conditionNode"

function handleMatchesSlot(
  sourceHandle: string | null | undefined,
  slot: DownstreamSlot,
): boolean {
  if (slot === "default") {
    return sourceHandle == null || sourceHandle === ""
  }
  return sourceHandle === slot
}

function requiredSlots(nodeType: string | undefined): DownstreamSlot[] {
  if (nodeType === CONDITION_TYPE) return ["yes", "no"]
  if (SINGLE_SOURCE_TYPES.has(nodeType ?? "")) return ["default"]
  return []
}

function graphSignature(nodes: Node[], edges: Edge[]) {
  const n = [...nodes]
    .map((node) => ({
      id: node.id,
      type: node.type,
      data: node.data,
    }))
    .sort((a, b) => a.id.localeCompare(b.id))
  const e = [...edges]
    .map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle ?? null,
      type: edge.type ?? null,
    }))
    .sort((a, b) => a.id.localeCompare(b.id))
  return JSON.stringify({ nodes: n, edges: e })
}

/**
 * Ensures every branch handle that has no outgoing edge gets a plus node (open slot).
 * Removes auto placeholders when their slot connects to a real step instead.
 */
export function ensureDownstreamPlusNodes(
  nodes: Node[],
  edges: Edge[],
): { nodes: Node[]; edges: Edge[] } {
  let nextNodes = nodes.map((n) => ({
    ...n,
    data: { ...n.data },
  }))
  let nextEdges = edges.map((e) => ({ ...e }))

  const plusNodes = nextNodes.filter((n) => n.type === "plusNode")

  const toRemove = new Set<string>()
  for (const plus of plusNodes) {
    const meta = plus.data as {
      downstreamOf?: string
      branchSlot?: DownstreamSlot
    }
    if (!meta.downstreamOf) continue

    const parentId = meta.downstreamOf
    const slot: DownstreamSlot = meta.branchSlot ?? "default"

    const linkedFromParent = nextEdges.some(
      (e) =>
        e.source === parentId &&
        e.target === plus.id &&
        handleMatchesSlot(e.sourceHandle, slot),
    )
    if (!linkedFromParent) {
      toRemove.add(plus.id)
      continue
    }

    const fromSlot = nextEdges.filter(
      (e) =>
        e.source === parentId && handleMatchesSlot(e.sourceHandle, slot),
    )
    const filledByOther = fromSlot.some((e) => e.target !== plus.id)
    if (filledByOther) {
      toRemove.add(plus.id)
    }
  }

  if (toRemove.size > 0) {
    nextNodes = nextNodes.filter((n) => !toRemove.has(n.id))
    nextEdges = nextEdges.filter(
      (e) => !toRemove.has(e.source) && !toRemove.has(e.target),
    )
  }

  function newPlusId() {
    return `plus-${globalThis.crypto?.randomUUID?.() ?? String(Date.now())}`
  }

  for (const node of nextNodes) {
    const slots = requiredSlots(node.type)
    if (slots.length === 0) continue

    for (const slot of slots) {
      const hasOutgoing = nextEdges.some(
        (e) =>
          e.source === node.id && handleMatchesSlot(e.sourceHandle, slot),
      )
      if (hasOutgoing) continue

      const plusId = newPlusId()
      const offsetX = slot === "yes" ? -100 : slot === "no" ? 100 : 0

      nextNodes.push({
        id: plusId,
        type: "plusNode",
        position: {
          x: node.position.x + offsetX,
          y: node.position.y + WORKFLOW_STEP_GAP_Y,
        },
        data: {
          downstreamOf: node.id,
          ...(slot !== "default" ? { branchSlot: slot } : {}),
        },
      })
      nextEdges.push({
        id: `e-${node.id}-${plusId}-${slot}`,
        source: node.id,
        target: plusId,
        ...(slot !== "default" ? { sourceHandle: slot } : {}),
        animated: true,
        // type: "edgeButton",
      })
    }
  }

  return { nodes: nextNodes, edges: nextEdges }
}

export function downstreamPlusGraphChanged(
  before: { nodes: Node[]; edges: Edge[] },
  after: { nodes: Node[]; edges: Edge[] },
): boolean {
  return graphSignature(before.nodes, before.edges) !== graphSignature(after.nodes, after.edges)
}
