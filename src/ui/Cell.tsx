import React from 'react'
import Datum from '../model/Datum'
import { GridAction } from '../model/actions'
import Value, { ALL_VALUES } from '../model/Value'
import './Cell.css'

const NUMBERS = [ '',
    'NumberTop NumberLeft',
    'NumberTop NumberCenter',
    'NumberTop NumberRight',
    'NumberMiddle NumberLeft',
    'NumberMiddle NumberCenter',
    'NumberMiddle NumberRight',
    'NumberBottom NumberLeft',
    'NumberBottom NumberCenter',
    'NumberBottom NumberRight',
]

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

type CellProps = {
    datum: Datum
    dispatch: React.Dispatch<GridAction>
    className?: string
}

export const Cell: React.FC<CellProps> = ({ datum, dispatch, className }) => {
    let classes = `Cell ${className}`

    if (datum.possible.length === 0) {
        classes += ' Impossible'
    }

    return (
        <td className={classes}>
            {ALL_VALUES.map(value =>
                <SubCell key={value} datum={datum} dispatch={dispatch} value={value}/>
            )}
        </td>
    )
}

export default React.memo(Cell)

type SubCellProps = {
    datum: Datum
    dispatch: React.Dispatch<GridAction>
    value: Value
}

const SubCell: React.FC<SubCellProps> = ({
    datum: { id, actual, possible, duplicates }, dispatch, value
 }) => {
    let classes = `Number ${NUMBERS[value]}`
    let onLeftClick = (e: React.MouseEvent) => {}
    let onRightClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
    }

    if (actual === value) {
        classes += ' Actual'

        if (duplicates.length > 0) {
            classes += ' Duplicate'
        }

        onRightClick = e => {
            e.preventDefault()

            dispatch({
                type: 'ClearActual',
                datum: id
            })
        }
    } else if (actual) {
        classes += ' Unactual ' + ACTUAL[actual]
    } else if (possible && possible.includes(value)) {
        classes += ' Possible'

        onLeftClick = () => {
            dispatch({
                type: 'RemovePossible',
                datum: id,
                possible: value
            })
        }

        onRightClick = e => {
            e.preventDefault()

            dispatch({
                type: 'SetActual',
                datum: id,
                actual: value
            })
        }
    } else {
        classes += ' Impossible'

        onLeftClick = () => {
            dispatch({
                type: 'AddPossible',
                datum: id,
                possible: value
            })
        }
    }

    return (
        <span className={classes} onClick={onLeftClick}
                onContextMenu={onRightClick}>
            {value}
        </span>
    )
 }
