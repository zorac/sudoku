import Solver from './Solver'
import { setActual } from '../model/updaters'

/**
 * Look for a datum which only has one possible value.
 *
 * @param grid The initial state of the grid.
 */
const datumSingleValue: Solver = grid => {
    const { data } = grid

    for (let id = 0; id < data.length; id++) {
        const { actual, possible } = data[id]

        if (!actual && (possible.length === 1)) {
            return setActual(grid, id, possible[0])
        }
    }

    return grid
}

export default datumSingleValue
