import Datum from './Datum'
import Group from './Group'

/**
 * A Sudoku grid.
 */
export default class Grid {
    /** The grid data. */
    data: Array<Datum>
    /** The groups in the grid. */
    groups: Array<Group>

    /**
     * Create a new group.
     *
     * @param data The grid data.
     * @param groups The groups in the grid.
     */
    constructor(data: Array<Datum>, groups: Array<Group>) {
        this.data = data
        this.groups = groups
    }
}
