/** Vertical distance between step centers in the main flow (column). */
export const WORKFLOW_STEP_GAP_Y = 100

/**
 * React Flow positions nodes by default from the top-left; mixed-width cards then look
 * staggered. Anchor at the center so steps that share `position.x` share one vertical axis.
 */
export const FLOW_NODE_ORIGIN: [number, number] = [0.5, 0.5]

/**
 * Initial trigger + plus straddle y=0 so the stack is centered on the vertical axis
 * (symmetric around flow origin on Y).
 */
export const INITIAL_TRIGGER_Y = -WORKFLOW_STEP_GAP_Y / 2
export const INITIAL_PLUS_Y = WORKFLOW_STEP_GAP_Y / 2
