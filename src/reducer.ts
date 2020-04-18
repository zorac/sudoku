import { AnyAction } from './actions'
import Grid from './model/Grid'
import gridReducer from './model/reducer'
import solverReducer from './solver/reducer'

/** Defines a reducer. */
export type Reducer = (
    /** The initial state of the grid. */
    state: Grid,
    /** The action to undertake. */
    action: AnyAction
) => Grid

/** The available reducers. */
const REDUCERS = [
    gridReducer,
    solverReducer,
]

/**
 * The application's reducer.
 *
 * @param state The current state of the grid.
 * @param action The action to undertake.
 * @return The new state of the grid, possibly unchanged.
 */
const reducer: Reducer = (state: Grid, action: AnyAction) => {
    for (let i = 0; i < REDUCERS.length; i++) {
        const grid = REDUCERS[i](state, action)

        if (grid !== state) {
            return grid
        }
    }

    return state
}

export default reducer
