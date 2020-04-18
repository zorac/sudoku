import { DatumId } from './Datum'
import Grid from './Grid'
import Value from './Value'

/** A comparison function for values. */
const byValue: (a: Value, b: Value) => number = (a, b) => a - b

/**
 * Remove a possible value from a datum.
 *
 * @param grid The current state of the grid.
 * @param id The ID of the datum to modify.
 * @param value The possible value to remove from the datum.
 * @return The new state of the grid, possibly unchanged.
 */
export function removePossible(
    grid: Grid,
    id: DatumId,
    value: Value
): Grid {
    const datum = grid.data[id]
    const { possible } = datum

    if (!possible.includes(value)) {
        return grid // Short-circuit invalid operations
    }

    const data = [ ...grid.data ]

    data[id] = {
        ...datum,
        possible: possible.filter(p => p !== value)
    }

    // TODO what if a group has no datum with actual/possible?

    return { ...grid, data, insoluble: false }
}

/**
 * Add a possible value to a datum.
 *
 * @param grid The current state of the grid.
 * @param id The ID of the datum to modify.
 * @param value The possible value to add to the datum.
 * @return The new state of the grid, possibly unchanged.
 */
export function addPossible(
    grid: Grid,
    id: DatumId,
    value: Value
): Grid {
    const datum = grid.data[id]
    const { possible } = datum

    if (possible.includes(value)) {
        return grid // Short-circuit invalid operations
    }

    const data = [ ...grid.data ]

    data[id] = {
        ...datum,
        possible: [ ...possible, value ].sort(byValue)
    }

    // TODO what if possible has an actual in a group?

    return { ...grid, data, insoluble: false }
}

/**
 * Set the actual value of a datum.
 *
 * @param grid The current state of the grid.
 * @param id The ID of the datum to modify.
 * @param value The actual value for the datum.
 * @return The new state of the grid, possibly unchanged.
 */
export function setActual(
    grid: Grid,
    id: DatumId,
    value: Value
): Grid {
    let { data, groups, solved } = grid
    let datum = data[id]
    const { actual, groups: datumGroups, possible } = datum

    if ((actual === value) || !possible.includes(value)) {
        return grid // Short-circuit invalid operations
    } else if (actual) {
        return setActual(clearActual(grid, id), id, value)
    }

    data = [ ...data ]
    groups = [ ...groups ]
    solved = [ ...solved, id ]
    datum = { ...datum, actual: value }
    data[id] = datum

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i]
        const { data: groupData, id: groupId, missing } = group

        if (!datumGroups.includes(groupId)) {
            continue
        }

        for (let j = 0; j < groupData.length; j++) {
            const otherId = groupData[j]

            if (otherId === id) {
                continue
            }

            const other = data[otherId]
            const { actual, possible } = other

            if (actual === value) {
                if (!datum.duplicates.includes(otherId)) {
                    datum.duplicates = [ ...datum.duplicates, otherId ]

                    if (datum.duplicates.length === 1) {
                        solved = solved.filter(s => s !== id)
                    }
                }

                if (!other.duplicates.includes(id)) {
                    const duplicates = [ ...other.duplicates, id ]

                    data[otherId] = { ...other, duplicates }

                    if (duplicates.length === 1) {
                        solved = solved.filter(s => s !== otherId)
                    }
                }
            } else if (possible.includes(value)) {
                data[otherId] = {
                    ...other,
                    possible: possible.filter(p => p !== value)
                }
            }
        }

        groups[i] = { ...group, missing: missing.filter(m => m !== value) }
    }

    return { ...grid, data, groups, solved, insoluble: false }
}

/**
 * Clear the actual value of a datum.
 *
 * @param grid The current state of the grid.
 * @param id The ID of the datum to modify.
 * @return The new state of the grid, possibly unchanged.
 */
export function clearActual(
    grid: Grid,
    id: DatumId
): Grid {
    let { data, groups, solved } = grid
    let datum = data[id]
    const { actual, groups: datumGroups } = datum

    if (!actual) {
        return grid // Short-circuit invalid operations
    }

    data = [ ...data ]
    groups = [ ...groups ]
    solved = solved.filter(s => s !== id)
    data[id] = { ...datum, actual: undefined, duplicates: [] }

    for (let groupId = 0; groupId < groups.length; groupId++) {
        if (!datumGroups.includes(groupId)) {
            continue
        }

        const group = groups[groupId]
        const { data: groupData, missing } = group

        for (let j = 0; j < groupData.length; j++) {
            const otherId = groupData[j]

            if (otherId === id) {
                continue
            }

            const other = data[otherId]

            if (other.actual === actual) {
                if (other.duplicates.includes(id)) {
                    const duplicates = other.duplicates.filter(d => d !== id)

                    data[otherId] = { ...other, duplicates }

                    if (duplicates.length === 0) {
                        solved.push(otherId)
                    }
                }
            }
        }

        // TODO may not be correct if there are duplicates!
        groups[groupId] = {
            ...group,
            missing: [ ...missing, actual ].sort(byValue)
        }
    }

    return { ...grid, data, groups, solved, insoluble: false }
}
