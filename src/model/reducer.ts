import { AnyAction } from '../actions'
import Grid from './Grid'
import { GridReducer } from '../reducer'
import { addPossible, clearActual, removePossible, setActual } from './updaters'

/**
 * A reducer for the grid.
 *
 * @param state The previous state.
 * @param action The action to undertake.
 * @return The new state, possibly unchanged.
 */
const reducer: GridReducer = (state: Grid, action: AnyAction) => {
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

export default reducer
