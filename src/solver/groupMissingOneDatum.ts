import Solver from './Solver'
import { setActual } from '../model/updaters'

/**
 * Look for a missing group value which is only possible in one datum.
 *
 * @param grid The initial state of the grid.
 */
const groupMissingOneDatum: Solver = grid => {
    const { data: gridData } = grid

    for (let id = 0; id < grid.groups.length; id++) {
        const { data: groupData, missing } = grid.groups[id]
        const data = groupData.map(d => gridData[d]).filter(d => !d.actual)

        for (let i = 0; i < missing.length; i++) {
            const value = missing[i]
            const possible = data.filter(d => d.possible.includes(value))

            if (possible.length === 1) {
                return setActual(grid, possible[0].id, value)
            }
        }
    }

    return grid
}

export default groupMissingOneDatum
