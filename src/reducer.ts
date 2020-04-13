import { AnyAction } from './actions'
import Grid from './model/Grid'
import gridReducer from './model/reducer'

/**
 * The application's reducer.
 *
 * @param state The current state of the grid.
 * @param action The action to undertake.
 * @return The new state of the grid, possibly unchanged.
 */
export default function reducer(state: Grid, action: AnyAction): Grid {
    return gridReducer(state, action)
}
