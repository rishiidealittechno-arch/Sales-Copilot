import { Button } from "@/components/ui/button";
import { DeleteIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    EdgeToolbar,
    getBezierPath,
    BaseEdge,
    type EdgeProps,
    useReactFlow,
} from '@xyflow/react';
import { Card, CardContent } from "@/components/ui/card";

export function EdgeWithButton(props: EdgeProps) {
    const [edgePath, centerX, centerY] = getBezierPath(props);
    const { deleteElements, getEdges } = useReactFlow();
    const deleteEdge = () => {
        const edge = getEdges().find((e) => e.id === props.id);
        if (edge) deleteElements({ edges: [edge] });
    };

    return (
        <>
            <BaseEdge id={props.id} path={edgePath} />
            <EdgeToolbar data-item-type="edge-button" edgeId={props.id} x={centerX} y={centerY} isVisible>
                <Card className="shadow-none p-0 ring-0 border-none">
                    <CardContent className="flex p-0 items-center justify-center gap-2">
                        {/* <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" type="button" size='icon'>
                                    <HugeiconsIcon icon={PlusSignIcon} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="z-[200]">
                            <DropdownMenuGroup>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={ZapIcon} />
                                    Trigger
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                            <HugeiconsIcon icon={Mail01Icon} />
                                            Email
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={Clock01Icon} />
                                        Wait</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={WorkflowCircleIcon} />
                                        Condition</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <HugeiconsIcon icon={FilterIcon} />
                                        Filter</DropdownMenuItem>

                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <span>Archive</span>
                                        <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>Move to project</DropdownMenuItem>
                                                <DropdownMenuItem>Move to folder</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Advanced options</DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuItem>Add to favorites</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive">
                                    <span>Delete</span>
                                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}

                        <Button variant="secondary" size="icon" onClick={deleteEdge}>
                            <HugeiconsIcon icon={DeleteIcon} />
                        </Button>
                    </CardContent>
                </Card>
            </EdgeToolbar>
        </>
    );
}
