import Grid from '../model/Grid'

/** A solver function. */
type Solver = (
    /** The current state of the grid. */
    grid: Grid
) => Grid

export default Solver
