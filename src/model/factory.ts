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

    for (let datum_id = 0; datum_id < 81; datum_id++) {
        data[datum_id] = new Datum(datum_id)
    }

    for (let i = 0; i < 9; i++) {
        const row_id = i
        const row = groups[i] = new Group(row_id)

        for (let datum_id = (i * 9); datum_id < ((i + 1) * 9); datum_id++) {
            data[datum_id].groups.push(row_id)
            row.data.push(datum_id)
        }

        const column_id = i + 9
        let column = groups[column_id] = new Group(column_id)

        for (let datum_id = i; datum_id < 81; datum_id += 9) {
            data[datum_id].groups.push(column_id)
            column.data.push(datum_id)
        }

        const block_id = i + 18
        let block = groups[block_id] = new Group(block_id)

        for (let j = 0; j < 9; j++) {
            const datum_id = ((i % 3) * 3)
                + (Math.floor(i / 3) * 27)
                + (j % 3)
                + (Math.floor(j / 3) * 9)

            data[datum_id].groups.push(block_id)
            block.data.push(datum_id)
        }
    }

    return new Grid(data, groups)
}
