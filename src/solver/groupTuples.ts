import Solver from './Solver'
import Datum from '../model/Datum'
import { removePossible } from '../model/updaters'
import Value from '../model/Value'

/**
 * Find closed sets (n data each containing only the same n values) and remove
 * remove those values from all other data.
 *
 * @param grid The initial state of the grid.
 */
const groupTuples: Solver = grid => {
    let { data: gridData } = grid
    let newGrid = grid

    for (let id = 0; id < grid.groups.length; id++) {
        const { data: groupData, missing } = grid.groups[id]

        // We only use tuples of size 2 to n-3, so need at least 5 values TODO why?
        if (missing.length < 5) continue

        const data = groupData.map(d => gridData[d]).filter(d => !d.actual)

        // Iterate over size of tuple, starting small
        for (let size = 2; size < (missing.length - 3); size++) {
            let tuples: Array<Array<Value>> = []

            // Create all the tuples of the given size
            for (let i = 0; i < size; i++) {
                let tmp = tuples

                tuples = []

                for (let j = 0; j < tmp.length; j++) {
                    const tuple = tmp[j]

                    for (let k = 0; k < missing.length; k++) {
                        const value = missing[k]

                        if (!tuple.includes(value)) {
                            tuples.push([ ...tuple, value ])
                        }
                    }
                }
            }

            // Check each tuple in turn
            for (let i = 0; i < tuples.length; i++) {
                const tuple = tuples[i]
                const good: Array<Datum> = []
                let bad = false

                // Check cells to see if they contain the tuple, or if they
                // contain a sub-set of the tuple (which is bad)
                for (let j = 0; j < data.length; j++) {
                    const datum = data[j]
                    const { possible } = datum
                    const count = possible.filter(p => tuple.includes(p)).length

                    if (count === tuple.length) {
                        good.push(datum)
                    } else if (count > 0) {
                        bad = true
                    }
                }

                // If the number of cells containing the tuple is the same as
                // the number of values in the tuple, remove all other values
                // from those cells
                if (!bad && (good.length === tuple.length)) {
                    for (let j = 0; j < good.length; j++) {
                        const { id, possible } = good[j]

                        for (let k = 0; k < possible.length; k++) {
                            const value = possible[k]

                            if (!tuple.includes(value)) {
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

export default groupTuples
