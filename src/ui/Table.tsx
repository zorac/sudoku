import React from 'react'
import { AnyAction } from '../actions'
import ColumnCell from './ColumnCell'
import Grid from '../model/Grid'
import GridCell from './GridCell'
import RowCell from './RowCell'
import Toolbar from './Toolbar'
import './Table.scss'
import BoxCell from './BoxCell'

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
    canUndo: boolean
    canRedo: Boolean
    dispatch: React.Dispatch<AnyAction>
}

const Table: React.FC<TableProps> = (props) => {
    const { grid, dispatch } = props

    return (
        <table className="Table">
            <thead>
                <tr>
                    <td colSpan={9}>
                        <Toolbar {...props}/>
                    </td>
                </tr>
            </thead>
            <tbody>
                {INDICES.map(y =>
                    <tr key={y}>
                        {INDICES.map(x =>
                            <GridCell key={x}
                                className={`${CLASSY[y]} ${CLASSX[x]}`}
                                datum={grid.data[(y * 9) + x]}
                                dispatch={dispatch}/>
                        )}
                        <RowCell group={grid.groups[y]}/>
                    </tr>
                )}
                <tr>
                    {INDICES.map(x =>
                        <ColumnCell key={x} group={grid.groups[x + 9]}/>
                    )}
                    <BoxCell group={grid.groups[18]}/>
                    <BoxCell group={grid.groups[19]}/>
                    <BoxCell group={grid.groups[20]}/>
                </tr>
                <tr>
                    <BoxCell group={grid.groups[21]}/>
                    <BoxCell group={grid.groups[22]}/>
                    <BoxCell group={grid.groups[23]}/>
                </tr>
                <tr>
                    <BoxCell group={grid.groups[24]}/>
                    <BoxCell group={grid.groups[25]}/>
                    <BoxCell group={grid.groups[26]}/>
                </tr>
            </tbody>
        </table>
    )
}

export default React.memo(Table)
