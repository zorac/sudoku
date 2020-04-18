import Datum, { DatumId } from './Datum'
import Group from './Group'
import Intersection from './Intersection'

/**
 * A Sudoku grid.
 */
export default class Grid {
    /** The grid data. */
    data: Array<Datum>
    /** The groups in the grid. */
    groups: Array<Group>
    /** The groups in the grid. */
    intersections: Array<Intersection>
    /** Ids of the data which have been solved. */
    solved: Array<DatumId> = []
    /** True iff the solver has flagged the grid as insoluble. */
    insoluble = false

    /**
     * Create a new group.
     *
     * @param data The grid data.
     * @param groups The groups in the grid.
     */
    constructor(data: Array<Datum>, groups: Array<Group>) {
        const intersections: Array<Intersection> = []

        for (let i = 0; i < groups.length; i++) {
            const { data: dataI } = groups[i]

            for (let j = i + 1; j < groups.length; j++) {
                const dataJ = groups[j].data.filter(d => dataI.includes(d))

                if (dataJ.length > 1) {
                    intersections.push(new Intersection([ i, j ], dataJ))
                }
            }
        }

        this.data = data
        this.groups = groups
        this.intersections = intersections
    }
}
