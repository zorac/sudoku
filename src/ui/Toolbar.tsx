import React, { useState, useEffect, useCallback } from 'react'
import { AnyAction } from '../actions'
import { makeStandardGrid } from '../model/factory'
import { importStandardGrid } from '../model/importers'
import Grid from '../model/Grid'
import './Toolbar.css'

type ToolbarProps = {
    grid: Grid
    dispatch: React.Dispatch<AnyAction>
}

const Toolbar: React.FC<ToolbarProps> = ({
    grid: { data, solved, insoluble },
    dispatch
}) => {
    const [ content, setContent ] = useState('')
    const [ running, setRunning ] = useState(false)

    const percent = Math.floor(100 * (solved.length / data.length))
    const canSolve = !insoluble && (percent < 100)
    const noSolve = running || !canSolve

    const step = useCallback(() => dispatch({
        type: 'Solve'
    }), [ dispatch ])

    const clear = useCallback(() => dispatch({
        type: 'SetGrid',
        grid: makeStandardGrid()
    }), [ dispatch ])

    const doImport = useCallback(() => dispatch({
        type: 'SetGrid',
        grid: importStandardGrid(content)
    }), [ content, dispatch ])

    useEffect(() => {
        if (running) {
            if (canSolve) {
                const interval = window.setInterval(step, 250)

                return () => { window.clearInterval(interval) }
            } else {
                setRunning(false)
            }
        }
    }, [ canSolve, running, setRunning, step ])

    return (
        <div className="Toolbar">
            <span className="Solved">{percent}% Solved</span>
            {insoluble && <span className="Insoluble">Insoluble</span>}
            <button onClick={step} disabled={noSolve}>Step</button>
            <button onClick={() => setRunning(true)} disabled={noSolve}>Run</button>
            <button onClick={() => setRunning(false)} disabled={!running}>Stop</button>
            <button onClick={clear} disabled={running}>Clear</button>
            <input value={content} onChange={ e => setContent(e.target.value)}/>
            <button onClick={doImport} disabled={running}>Import</button>
        </div>
    )
}

export default Toolbar
