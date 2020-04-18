import { Action } from '../actions'
import { DatumId} from './Datum'
import Grid from './Grid'
import Value from './Value'

/** Base type for an action affecting a datum. */
type DatumAction = Action & {
    /** The unique ID of the datum to modify. */
    datum: DatumId
}

/** Action to completely replace the grid witha new one. */
export type SetGridAction = Action & {
    type: 'SetGrid'
    /** The grid to set. */
    grid: Grid
}

/** Action to remove a possible value from a datum. */
export type RemovePossibleAction = DatumAction & {
    type: 'RemovePossible'
    /** The possible value to remove from the datum. */
    possible: Value
}

/** Action to add a possible value to a datum. */
export type AddPossibleAction = DatumAction & {
    type: 'AddPossible'
    /** The possible value to add to the datum. */
    possible: Value
}

/** Action to set the actual value of a datum. */
export type SetActualAction = DatumAction & {
    type: 'SetActual'
    /** The actual value to set on the datum. */
    actual: Value
}

/** Action to clear the actual value of a datum. */
export type ClearActualAction = DatumAction & {
    type: 'ClearActual'
}

/** All actions handled by the grid reducer. */
export type GridAction = SetGridAction
                        | RemovePossibleAction
                        | AddPossibleAction
                        | SetActualAction
                        | ClearActualAction
