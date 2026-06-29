import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function TriggerNode({ selected }: NodeProps) {
  return (
    <>
      <div className="group">
        <Card
          className={cn(
            "min-w-max max-w-min border-none px-4 p-2",
            selected && "border-red-500",
          )}
        >
          <CardContent className="flex flex-col gap-1 py-0">
            <div className="gap-2">
              <p className="text-muted-foreground text-xs font-medium">Trigger</p>
              <p className="text-xs w-max font-semibold tracking-tight tabular-nums">
                Launch Manually.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="opacity-0 group-hover:opacity-100 duration-300 !w-2 !h-2 border-2 border-red-500"
      />  
    </>
  )
}

export default memo(TriggerNode)
