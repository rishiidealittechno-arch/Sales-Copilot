import { Button } from "@/components/ui/button"
import "@xyflow/react/dist/style.css"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Link02FreeIcons,
  PlayCircle02FreeIcons,
} from "@hugeicons/core-free-icons"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useCallback, useEffect, useState } from "react"
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type EdgeTypes,
  type Node,
  type NodeMouseHandler,
  type NodeTypes,
  BackgroundVariant,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "@xyflow/react"
import { EdgeWithButton } from "./edges-types/edge-button"
import { useTheme } from "@/components/theme-provider"
import TriggerNode from "./nodes-ui/trigger-node"
import PlusNode from "./nodes-ui/plus-node"
import { NodeDetailPanel } from "./panels/node-detail-panel"
import actionNode from "./nodes-ui/action-node"
import conditionNode from "./nodes-ui/condition-node"
import emailNode from "./nodes-ui/email-node"
import endNode from "./nodes-ui/end-node"
import smsNode from "./nodes-ui/sms-node"
import waitNode from "./nodes-ui/wait-node"
import {
  downstreamPlusGraphChanged,
  ensureDownstreamPlusNodes,
} from "./utils/ensure-downstream-plus-nodes"
import {
  FLOW_NODE_ORIGIN,
  INITIAL_PLUS_Y,
  INITIAL_TRIGGER_Y,
} from "./utils/workflow-layout"

const position = { x: 0, y: INITIAL_TRIGGER_Y }

const edgeTypes = {
  edgeButton: EdgeWithButton,

} satisfies EdgeTypes

export const initialNodes = [
  {
    id: "1",
    type: "trigger",
    data: {},
    position,
  },
  {
    id: "2",
    type: "plusNode",
    data: {},
    /** Same x as trigger; spaced by WORKFLOW_STEP_GAP_Y, centered on flow y=0 with trigger. */
    position: { x: 0, y: INITIAL_PLUS_Y },
  },
]

const nodeTypes = {
  trigger: TriggerNode,
  actionNode: actionNode,
  conditionNode: conditionNode,
  emailNode: emailNode,
  smsNode: smsNode,
  waitNode: waitNode,
  endNode: endNode,
  plusNode: PlusNode,
} satisfies NodeTypes

export const initialEdges = [
  { id: "e12", source: "1", target: "2", animated: true },
]


const Flow = () => {


  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const onNodesDelete = useCallback(
    (deleted: readonly Node[]) => {
      let remainingNodes = [...nodes];
      setEdges(
        deleted.reduce((acc: Edge[], node: Node) => {
          const incomers = getIncomers(node, remainingNodes, acc);
          const outgoers = getOutgoers(node, remainingNodes, acc);
          const connectedEdges = getConnectedEdges([node], acc);
 
          const remainingEdges = acc.filter((edge: Edge) => !connectedEdges.includes(edge));
 
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
              animated: true,
            })),
          );
 
          remainingNodes = remainingNodes.filter((rn) => rn.id !== node.id);
 
          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges],
  );

  const clearNodeSelection = useCallback(() => {
    setSelectedNode(null)
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })))
  }, [setNodes])

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedNode(node)
  }, [])

  const onPaneClick = useCallback(() => {
    clearNodeSelection()
  }, [clearNodeSelection])

  useEffect(() => {
    const next = ensureDownstreamPlusNodes(nodes, edges)
    if (
      !downstreamPlusGraphChanged({ nodes, edges }, next)
    ) {
      return
    }
    setNodes(next.nodes)
    setEdges(next.edges)
  }, [nodes, edges, setNodes, setEdges])

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            // type: "edgeButton",
            animated: true,
          },
          eds,
        ),
      )
    },
    [setEdges],
  )

  const {theme} = useTheme()

  return (
    <ReactFlow
      className="h-full w-full"
      maxZoom={1.2}
      minZoom={1.2}
      nodeOrigin={FLOW_NODE_ORIGIN}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      onNodesDelete={onNodesDelete}
      edgeTypes={edgeTypes}
      connectionLineType={ConnectionLineType.SimpleBezier}
      fitView
      nodeTypes={nodeTypes}
      colorMode={theme}
    >
      <Background
      gap={16}
      size={1}
      color="gray"
      variant={BackgroundVariant.Dots} />
      <NodeDetailPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </ReactFlow>
  )
}

const Page = () => {
  return (
    <div className=" flex h-full min-h-0 flex-col fixed top-0 left-0 w-full z-100 bg-background">
      <div className="flex shrink-0 items-center justify-between border-b border-dashed border-border/60 p-4">
        <Button variant="outline" size="lg" type="button">
          <HugeiconsIcon icon={ArrowLeft01Icon} />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg">
            <HugeiconsIcon icon={Link02FreeIcons} />
          </Button>
          <Separator orientation="vertical" />
          <Button variant="outline" size="lg">
            <HugeiconsIcon icon={PlayCircle02FreeIcons} />
            Run now
          </Button>
          <Button variant="outline" size="lg">
            <Switch />
            Disabled
          </Button>
          <Button variant="default" size="lg">
            Publish
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <Flow />
      </div>
    </div>
  )
}

export default Page
