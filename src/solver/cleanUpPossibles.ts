import Solver from './Solver'
import { removePossible } from '../model/updaters'

/**
 * Clean up any possible values which are not, in fact, possible.
 *
 * @param grid The initial state of the grid.
 */
const cleanUpPossibles: Solver = grid => {
    const { data, groups } = grid
    let newGrid = grid

    for (let i = 0; i < data.length; i++) {
        const { actual, id, possible, groups: groupIds } = data[i]

        for (let j = 0; j < possible.length; j++) {
            const value = possible[j]

            if (value === actual) continue

            for (let k = 0; k < groupIds.length; k++) {
                const { missing } = groups[groupIds[k]]

                if (!missing.includes(value)) {
                    newGrid = removePossible(newGrid, id, value)
                }
            }
        }
    }

    return newGrid
}

export default cleanUpPossibles
