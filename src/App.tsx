import React, { useReducer } from 'react'
import { makeStandardGrid } from './model/factory'
import reducer from './reducer'
import Table from './ui/Table'
import './App.css'
import Toolbar from './ui/Toolbar'

function App() {
  const [ grid, dispatch ] = useReducer(reducer, undefined, makeStandardGrid)

  return (
    <div className="App">
      <Toolbar grid={grid} dispatch={dispatch}/>
      <Table grid={grid} dispatch={dispatch}/>
    </div>
  );
}

export default App
