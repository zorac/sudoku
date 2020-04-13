import { DatumId } from './Datum'
import Grid from './Grid'
import Value from './Value'

/**
 * Remove a possible value from a datum.
 *
 * @param grid The current state of the grid.
 * @param datum_id The ID of the datum to modify.
 * @param possible The possible value to remove from the datum.
 * @return The new state of the grid, possibly unchanged.
 */
export function removePossible(
    grid: Grid,
    datum_id: DatumId,
    possible: Value
): Grid {
    const datum = grid.data[datum_id]

    if (datum.actual || !datum.possible.includes(possible)) {
        return grid // Short-circuit invalid operations
    }

    const data = [ ...grid.data ]

    data[datum_id] = {
        ...datum,
        possible: datum.possible.filter(n => n !== possible)
    }

    // TODO what if a group has no datum with actual/possible?

    return { ...grid, data }
}

/**
 * Add a possible value to a datum.
 *
 * @param grid The current state of the grid.
 * @param datum_id The ID of the datum to modify.
 * @param possible The possible value to add to the datum.
 * @return The new state of the grid, possibly unchanged.
 */
export function addPossible(
    grid: Grid,
    datum_id: DatumId,
    possible: Value
): Grid {
    const datum = grid.data[datum_id]

    if (datum.actual || datum.possible.includes(possible)) {
        return grid // Short-circuit invalid operations
    }

    const data = [ ...grid.data ]

    data[datum_id] = {
        ...datum,
        possible: [ ...datum.possible, possible ]
    }

    // TODO what if possible has an actual in a group?

    return { ...grid, data }
}

/**
 * Set the actual value of a datum.
 *
 * @param grid The current state of the grid.
 * @param datum_id The ID of the datum to modify.
 * @param actual The actual value for the datum.
 * @return The new state of the grid, possibly unchanged.
 */
export function setActual(
    grid: Grid,
    datum_id: DatumId,
    actual: Value
): Grid {
    let datum = grid.data[datum_id]

    if ((datum.actual === actual) || !datum.possible.includes(actual)) {
        return grid // Short-circuit invalid operations
    }

    const data = [ ...grid.data ]

    datum = { ...datum, actual }
    data[datum_id] = datum

    const groups = grid.groups.map(group => {
        if (!datum.groups.includes(group.id)) {
            return group
        }

        group.data.forEach(other_id => {
            if (other_id === datum_id) {
                return
            }

            const other = data[other_id]

            if (other.actual === actual) {
                if (!datum.duplicates.includes(other_id)) {
                    datum.duplicates = [ ...datum.duplicates, other_id ]
                }

                if (!other.duplicates.includes(datum_id)) {
                    data[other_id] = {
                        ...other,
                        duplicates: [ ...other.duplicates, datum_id ]
                    }
                }
            } else if (other.possible.includes(actual)) {
                data[other_id] = {
                    ...other,
                    possible: other.possible.filter(p => p !== actual)
                }
            }
        })

        return { ...group, missing: group.missing.filter(m => m !== actual) }
    })

    return { ...grid, data, groups }
}

/**
 * Clear the actual value of a datum.
 *
 * @param grid The current state of the grid.
 * @param datum_id The ID of the datum to modify.
 * @return The new state of the grid, possibly unchanged.
 */
export function clearActual(
    grid: Grid,
    datum_id: DatumId
): Grid {
    let datum = grid.data[datum_id]

    if (!datum.actual) {
        return grid // Short-circuit invalid operations
    }

    const actual = datum.actual
    let data = [ ...grid.data ]

    data[datum_id] = { ...datum, actual: undefined, duplicates: [] }

    let groups = grid.groups.map(group => {
        if (!datum.groups.includes(group.id)) {
            return group
        }

        group.data.forEach(other_id => {
            if (other_id === datum_id) {
                return
            }

            const other = data[other_id]

            if (other.actual === actual) {
                if (other.duplicates.includes(datum_id)) {
                    data[other_id] = {
                        ...other,
                        duplicates: other.duplicates.filter(d => d !== datum_id)
                    }
                }
            }
        })

        // TODO may not be correct if there are duplicates!
        return { ...group, missing: [ ...group.missing, actual ] }
    })

    return { ...grid, data, groups }
}
