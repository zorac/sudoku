import { AnyAction } from '../actions'
import Grid from '../model/Grid'
import { Reducer } from '../reducer'
import Solver from './Solver'
import checkForInsolubility from './checkForInsolubility'
import cleanUpPossibles from './cleanUpPossibles'
import datumSingleValue from './datumSingleValue'
import groupMissingOneDatum from './groupMissingOneDatum'
import groupClosedSets from './groupClosedSets'
import groupTuples from './groupTuples'
import groupIntersections from './groupIntersections'

/** The available solver methods, in order of priority. */
const SOLVERS: Array<Solver> = [
    checkForInsolubility,
    cleanUpPossibles,
    datumSingleValue,
    groupMissingOneDatum,
    groupClosedSets,
    groupTuples,
    groupIntersections,
]

/**
 * A reducer for the grid.
 *
 * @param state The current state of the grid.
 * @param action The action to undertake.
 * @return The new state of the grid, possibly unchanged.
 */
const reducer: Reducer = (state: Grid, action: AnyAction) => {
    switch (action.type) {
        case 'Solve':
            const { data, insoluble, solved } = state

            if (insoluble) {
                return state // No changes since last failed attempt to solve
            } else if (solved.length === data.length) {
                return state // Already solved!
            }

            for (let i = 0; i < SOLVERS.length; i++) {
                const grid = SOLVERS[i](state)

                if (grid !== state) {
                    return grid
                }
            }

            return { ...state, insoluble: true }
        default:
            return state
    }
}

export default reducer
