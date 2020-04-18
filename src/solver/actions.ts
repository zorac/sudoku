import { Action } from '../actions'

/** Action to peform a single stop of solving. */
export type SolveAction = Action & {
    type: 'Solve'
}

export type SolverAction = SolveAction
