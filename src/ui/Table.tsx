import React from 'react'
import Cell from './Cell'
import Grid from '../model/Grid'
import { GridAction } from '../model/actions'
import './Table.css'

const INDICES = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]

const CLASSX = [
    'GridLeft',
    '',
    'GroupRight',
    'GroupLeft',
    '',
    'GroupRight',
    'GroupLeft',
    '',
    'GridRight',
]

const CLASSY = [
    'GridTop',
    '',
    'GroupBottom',
    'GroupTop',
    '',
    'GroupBottom',
    'GroupTop',
    '',
    'GridBottom',
]

type TableProps = {
    grid: Grid
    dispatch: React.Dispatch<GridAction>
}

const Table: React.FC<TableProps> = ({ grid, dispatch }) => {
    return (
        <table className="Table">
            <tbody>
                {INDICES.map(y =>
                    <tr key={y}>
                        {INDICES.map(x =>
                            <Cell key={x}
                                className={`${CLASSY[y]} ${CLASSX[x]}`}
                                datum={grid.data[(y * 9) + x]}
                                dispatch={dispatch}/>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table
