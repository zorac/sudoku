import React from 'react'
import Group from '../model/Group'
import NumberCell from './NumberCell'
import { ALL_VALUES } from '../model/Value'
import './BoxCell.scss'

type BoxCellProps = {
    group: Group
}

const BoxCell: React.FC<BoxCellProps> = ({ group: { missing } }) => {
    return (
        <td className="BoxCell">
            {ALL_VALUES.map(value =>
                <NumberCell key={value} value={value} possible={missing}/>
            )}
        </td>
    )
}

export default React.memo(BoxCell)
