import { Action } from '../actions'

export type SolveAction = Action & {
    type: 'Solve'
}

export type SolverAction = SolveAction
