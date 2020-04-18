import Grid from './model/Grid'

/**
 * The shape of state for the application.
 */
type State = {
    /** The current state of the grid. */
    grid: Grid
    /** Previous states of the grid. */
    past: Array<Grid>
    /** Future states of the grid. */
    future: Array<Grid>
    /** The entire state before a grid reset. */
    reset?: State
}

export default State
