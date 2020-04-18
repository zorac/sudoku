import { AnyAction } from './actions'
import Grid from './model/Grid'
import State from './State'
import modelReducer from './model/reducer'
import solverReducer from './solver/reducer'

/** Defines a reducer. */
export type Reducer = (
    /** The previous state. */
    state: State,
    /** The action to undertake. */
    action: AnyAction
) => State

/** Defines a grid reducer. */
export type GridReducer = (
    /** The previous state. */
    state: Grid,
    /** The action to undertake. */
    action: AnyAction
) => Grid

/** The available reducers. */
const GRID_REDUCERS = [
    modelReducer,
    solverReducer,
]

/**
 * The application's reducer.
 *
 * @param state The previous state.
 * @param action The action to undertake.
 * @return The new state, possibly unchanged.
 */
const reducer: Reducer = (state: State, action: AnyAction) => {
    switch (action.type) {
        case 'SetGrid':
            return {
                grid: action.grid,
                past: [],
                future: [],
                reset: state,
            }
        case 'Undo':
            if (state.reset) {
                return state.reset
            } else if (state.past.length > 0) {
                const [ grid, ...past ] = state.past

                return {
                    grid,
                    past,
                    future: [ state.grid, ...state.future ],
                }
            } else {
                return state
            }
        case 'Redo':
            if (state.future.length > 0) {
                const [ grid, ...future ] = state.future

                return {
                    grid,
                    past: [ state.grid, ...state.past ],
                    future,
                }
            } else {
                return state
            }
        default:
            for (let i = 0; i < GRID_REDUCERS.length; i++) {
                const grid = GRID_REDUCERS[i](state.grid, action)

                if (grid !== state.grid) {
                    return {
                        grid,
                        past: [ state.grid, ...state.past ],
                        future: [],
                    }
                }
            }

            return state
    }
}

export default reducer
