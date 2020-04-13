import { GroupId } from './Group'
import Value, { ALL_VALUES } from './Value'

/** A unique identifier for a datum. Must be a non-negative integer. */
export type DatumId = number

/**
 * A single datum within a Sudoku grid.
 */
export default class Datum {
    /** The unique ID of this datum. */
    id: DatumId
    /** The possible numbers, empty if none. */
    possible = [ ...ALL_VALUES ]
    /** The actual selected number, or null. */
    actual?: Value
    /** Ids of the groups of which this datum is a member. */
    groups: Array<GroupId> = []
    /** Ids of datums which duplicate this actual datum. */
    duplicates: Array<DatumId> = []

    /**
     * Create a new datum.
     *
     * @param id The datum's unique ID.
     */
    constructor(id: DatumId) {
        this.id = id
    }
}
