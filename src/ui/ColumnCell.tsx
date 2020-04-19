import React from 'react'
import Group from '../model/Group'
import { ALL_VALUES } from '../model/Value'
import './ColumnCell.scss'

type ColumnCellProps = {
    group: Group
}

const ColumnCell: React.FC<ColumnCellProps> = ({ group: { missing } }) => {
    return (
        <td className="ColumnCell" rowSpan={3}>
            {ALL_VALUES.map(value =>
                <span key={value} className={missing.includes(value)
                        ? undefined : 'ColumnCellHidden'}>
                    {value}
                </span>
            )}
        </td>
    )
}

export default React.memo(ColumnCell)
