import { DatumId } from './Datum'
import Value from './Value'

/** A unique identifier for a group. Must be a non-negative integer. */
export type GroupId = number

/**
 * A group of data sharing a constraint.
 */
export default class Group {
    /** The unique ID of this group. */
    id: GroupId
    /** The IDs of the data which comprise this group. */
    data: Array<DatumId> = []
    /** The numbers which are missing from this group. */
    missing: Array<Value> = []

    /**
     * Create a new group.
     *
     * @param id The group's unique ID.
     */
    constructor(id: GroupId) {
        this.id = id
    }
}
