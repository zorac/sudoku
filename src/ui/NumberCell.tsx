import React from 'react'
import { DatumId } from '../model/Datum'
import { ModelAction } from '../model/actions'
import Value from '../model/Value'
import './NumberCell.scss'

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

type NumberCellProps = {
    value: Value
    possible: Array<Value>
    id?: DatumId
    actual?: Value
    duplicates?: Array<DatumId>
    dispatch?: React.Dispatch<ModelAction>
}

const NumberCell: React.FC<NumberCellProps> = ({
    id, actual, possible, duplicates, dispatch, value
 }) => {
    let classes = `Number ${NUMBERS[value]}`
    let onLeftClick = (e: React.MouseEvent) => {}
    let onRightClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
    }

    if (actual === value) {
        classes += ' Actual'

        if (duplicates && duplicates.length > 0) {
            classes += ' Duplicate'
        }

        if (id && dispatch) {
            onRightClick = e => {
                e.preventDefault()

                dispatch({
                    type: 'ClearActual',
                    datum: id
                })
            }
        }
    } else if (actual) {
        classes += ' Unactual'
    } else if (possible && possible.includes(value)) {
        classes += ' Possible'

        if (id && dispatch) {
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
        }
    } else {
        classes += ' Impossible'

        if (id && dispatch) {
            onLeftClick = () => {
                dispatch({
                    type: 'AddPossible',
                    datum: id,
                    possible: value
                })
            }
        }
    }

    return (
        <span className={classes} onClick={onLeftClick}
                onContextMenu={onRightClick}>
            {value}
        </span>
    )
}

export default NumberCell
