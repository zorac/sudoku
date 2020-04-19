import React from 'react'
import Datum from '../model/Datum'
import { ModelAction } from '../model/actions'
import NumberCell from './NumberCell'
import { ALL_VALUES } from '../model/Value'
import './GridCell.scss'

const ACTUAL = [ '',
    'ActualTop ActualLeft',
    'ActualTop ActualCenter',
    'ActualTop ActualRight',
    'ActualMiddle ActualLeft',
    'ActualMiddle ActualCenter',
    'ActualMiddle ActualRight',
    'ActualBottom ActualLeft',
    'ActualBottom ActualCenter',
    'ActualBottom ActualRight',
]

type GridCellProps = {
    datum: Datum
    dispatch: React.Dispatch<ModelAction>
    className?: string
}

const GridCell: React.FC<GridCellProps> = ({ datum, dispatch, className }) => {
    let classes = `Cell ${className}`

    if (datum.actual) classes += ' ' + ACTUAL[datum.actual]
    if (datum.possible.length === 0) classes += ' Impossible'

    return (
        <td className={classes}>
            {ALL_VALUES.map(value =>
                <NumberCell key={value} value={value} dispatch={dispatch}
                    {...datum}/>
            )}
        </td>
    )
}

export default React.memo(GridCell)
