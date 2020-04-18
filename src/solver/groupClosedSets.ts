import Solver from './Solver'
import { DatumId } from '../model/Datum'
import { removePossible } from '../model/updaters'

/**
 * Find closed sets (n data each containing only the same n values) and remove
 * remove those values from all other data.
 *
 * @param grid The initial state of the grid.
 */
const groupClosedSets: Solver = grid => {
    const { data: gridData, groups } = grid
    let newGrid = grid

    for (let groupId = 0; groupId < groups.length; groupId++) {
        const sets: { [key: string]: Array<DatumId> } = {}
        const { data: groupData } = groups[groupId]
        const data = groupData.map(d => gridData[d]).filter(d => !d.actual)

        // Create a map of sets to data

        for (let i = 0; i < data.length; i++) {
            const { id, possible } = data[i]
            const set = possible.join()

            if (sets[set]) {
                sets[set].push(id)
            } else {
                sets[set] = [ id ]
            }
        }

        // TODO: to be correct, we should actually include subsets,
        // e.g. 1,2,3 should also include 1,2 1,3 & 2,3
        // Bonus points: go looking for supersets

        for (let set in sets) {
            const values = set.split(',').map(v => +v)
            const ids = sets[set]

            if (values.length === ids.length) {
                // This is a closed set - these values are no longer possible
                // in any of the other data in the group

                for (let i = 0; i < data.length; i++) {
                    const { id, possible } = data[i]

                    if (!ids.includes(id)) {
                        for (let j = 0; j < possible.length; j++) {
                            const value = possible[j]

                            if (values.includes(value)) {
                                newGrid = removePossible(newGrid, id, value)
                            }
                        }
                    }
                }

                if (newGrid !== grid) return newGrid
            } else if (values.length < ids.length) {
                // e.g Three cells in a group with possible of only 1,2
                return { ...grid, insoluble: true }
            }
        }
    }

    return grid
}

export default groupClosedSets
