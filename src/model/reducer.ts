import { AnyAction } from '../actions'
import Grid from './Grid'
import { addPossible, clearActual, removePossible, setActual } from './updaters'

/**
 * A reducer for the grid.
 *
 * @param state The current state of the grid.
 * @param action The action to undertake.
 * @return The new state of the grid, possibly unchanged.
 */
export default function reducer(state: Grid, action: AnyAction): Grid {
    switch (action.type) {
        case 'RemovePossible':
            return removePossible(state, action.datum, action.possible)
        case 'AddPossible':
            return addPossible(state, action.datum, action.possible)
        case 'SetActual':
            return setActual(state, action.datum, action.actual)
        case 'ClearActual':
            return clearActual(state, action.datum)
        default:
            return state
    }
}
