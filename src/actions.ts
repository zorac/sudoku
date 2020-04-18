import { GridAction } from './model/actions'
import { SolverAction } from './solver/actions'

/** Base type for an action. */
export type Action = {
    /** The type of the action. */
    type: string
}

/** Type of any valid action. */
export type AnyAction = GridAction | SolverAction
