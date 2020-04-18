import Datum from './Datum'
import Grid from './Grid'
import Group from './Group'

/**
 * Create a standard Sudoku grid.
 *
 * @returns The grid.
 */
export function makeStandardGrid(): Grid {
    let data: Array<Datum> = []
    let groups: Array<Group> = []

    for (let datumId = 0; datumId < 81; datumId++) {
        data[datumId] = new Datum(datumId)
    }

    for (let i = 0; i < 9; i++) {
        const rowId = i
        const row = groups[i] = new Group(rowId)

        for (let datumId = (i * 9); datumId < ((i + 1) * 9); datumId++) {
            data[datumId].groups.push(rowId)
            row.data.push(datumId)
        }

        const columnId = i + 9
        let column = groups[columnId] = new Group(columnId)

        for (let datumId = i; datumId < 81; datumId += 9) {
            data[datumId].groups.push(columnId)
            column.data.push(datumId)
        }

        const blockId = i + 18
        let block = groups[blockId] = new Group(blockId)

        for (let j = 0; j < 9; j++) {
            const datumId = ((i % 3) * 3)
                + (Math.floor(i / 3) * 27)
                + (j % 3)
                + (Math.floor(j / 3) * 9)

            data[datumId].groups.push(blockId)
            block.data.push(datumId)
        }
    }

    return new Grid(data, groups)
}
