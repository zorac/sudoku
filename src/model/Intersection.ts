import { DatumId } from './Datum'
import { GroupId } from './Group'

/**
 * Represents the intersection between two or more groups.
 */
export default class Intersection {
    /** The IDs of the groups in the intersection. */
    groups: Array<GroupId>
    /** The IDs of the data in the intersection. */
    data: Array<DatumId>

    /**
     * Create a new intersection.
     *
     * @param groups The IDs of the groups in the intersection.
     * @param data The IDs of the data in the intersection.
     */
    constructor(groups: Array<GroupId>, data: Array<DatumId>) {
        this.groups = groups
        this.data = data
    }
}
