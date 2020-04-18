import Grid from './model/Grid'
import { ModelAction } from './model/actions'
import { SolverAction } from './solver/actions'

/** Base type for an action. */
export type Action = {
    /** The type of the action. */
    type: string
}

/** Action to completely replace the grid witha new one. */
export type SetGridAction = Action & {
    type: 'SetGrid'
    /** The grid to set. */
    grid: Grid
}

/** Action to undo the last action. */
export type UndoAction = Action & {
    type: 'Undo'
}

/** Action to redo the laste action. */
export type RedoAction = Action & {
    type: 'Redo'
}

/** All actions handled by the state reducer. */
export type StateAction = SetGridAction
                        | UndoAction
                        | RedoAction

/** Type of any valid action. */
export type AnyAction = StateAction | ModelAction | SolverAction
