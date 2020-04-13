import React, { useReducer } from 'react'
import { makeStandardGrid } from './model/factory'
import reducer from './reducer'
import Table from './ui/Table'
import './App.css'

function App() {
  const [ grid, dispatch ] = useReducer(reducer, undefined, makeStandardGrid)

  return (
    <div className="App">
      <Table grid={grid} dispatch={dispatch}/>
    </div>
  );
}

export default App
