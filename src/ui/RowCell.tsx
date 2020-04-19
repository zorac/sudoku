import React from 'react'
import Group from '../model/Group'
import { ALL_VALUES } from '../model/Value'
import './RowCell.scss'

type RowCellProps = {
    group: Group
}

const RowCell: React.FC<RowCellProps> = ({ group: { missing } }) => {
    return (
        <td className="RowCell" colSpan={3}>
            {ALL_VALUES.map(value =>
                <span key={value} className={missing.includes(value)
                        ? undefined : 'RowCellHidden'}>
                    {value}
                </span>
            )}
        </td>
    )
}

export default React.memo(RowCell)
