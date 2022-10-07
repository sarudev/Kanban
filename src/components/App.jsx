import React from 'react'
import Board from './Board'

const columns = {
  'column-1': {
    id: 'column-1',
    title: 'To do',
    taskIds: []
  },
  'column-2': {
    id: 'column-2',
    title: 'WIP',
    taskIds: []
  },
  'column-3': {
    id: 'column-3',
    title: 'Testing',
    taskIds: []
  },
  'column-4': {
    id: 'column-4',
    title: 'Done',
    taskIds: []
  }
}

function App () {
  return (
    <Board initialColumns={columns} />
  )
}

export default App
