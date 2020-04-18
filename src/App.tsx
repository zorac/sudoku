import React, { useReducer } from 'react'
import reducer from './reducer'
import Table from './ui/Table'
import Toolbar from './ui/Toolbar'
import { makeStandardGrid } from './model/factory'
import './App.css'

function App() {
    const [ { grid, past, future, reset }, dispatch ] = useReducer(
        reducer, undefined, () => {
            return { grid: makeStandardGrid(), past: [], future: [] }
        }
    )

    return (
        <div className="App">
            <Toolbar grid={grid} canUndo={(past.length > 0) || !!reset}
                canRedo={future.length > 0} dispatch={dispatch}/>
            <Table grid={grid} dispatch={dispatch}/>
        </div>
    );
}

export default App
