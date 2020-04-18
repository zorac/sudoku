import Solver from './Solver'

/**
 * Perform basic checks for insolubility.
 *
 * @param grid The initial state of the grid.
 */
const checkForInsolubility: Solver = grid => {
    const { data } = grid

    for (let i = 0; i < data.length; i++) {
        const { actual, duplicates, possible } = data[i]

        if (
            (duplicates.length > 0)
            || (possible.length === 0)
            || (actual && !possible.includes(actual))
        ) {
            return { ...grid, insoluble: true }
        }
    }

    // TODO check for groups with no possibles for a missing number

    return grid
}

export default checkForInsolubility
