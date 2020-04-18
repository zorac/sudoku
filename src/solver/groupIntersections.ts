import Solver from './Solver'
import { removePossible } from '../model/updaters'

/**
 * Find values which, according to one group, can only appear in the
 * intersection between two or more groups, and remove them from the
 * non-intersecting cells of the other group(s) in the intersection
 *
 * @param grid The initial state of the grid.
 */
const groupIntersections: Solver = grid => {
    const { data, intersections, groups } = grid
    let newGrid = grid

    // For each intersection
    for (let i = 0; i < intersections.length; i++) {
        const { data: datumIds, groups: groupIds } = intersections[i]

        // For each group in the intersection
        for (let j = 0; j < groupIds.length; j++) {
            const { data: groupData, missing } = groups[groupIds[j]]

            // For each missing value in the group
            for (let k = 0; k < missing.length; k++) {
                const value = missing[k]
                let bad = false

                // Check that the missing value only appears in the intersection
                for (let l = 0; l < groupData.length; l++) {
                    if (!datumIds.includes(groupData[l])) {
                        const { actual, possible } = data[groupData[l]]

                        if (!actual && possible.includes(value)) {
                            bad = true
                            break
                        }
                    }
                }

                if (bad) continue

                // For every other group in the intersection
                for (let l = 0; l < groupIds.length; l++) {
                    if (l === j) continue

                    const { data: otherData } = groups[groupIds[l]]

                    // For every cell that's not in the intersection
                    for (let m = 0; m < otherData.length; m++) {
                        const id = otherData[m]

                        if (!datumIds.includes(id)) {
                            const { actual, possible } = data[id]

                            if (!actual && possible.includes(value)) {
                                newGrid = removePossible(newGrid, id, value)
                            }
                        }
                    }
                }

                if (newGrid !== grid) return newGrid
            }
        }
    }

    return grid
}

export default groupIntersections
