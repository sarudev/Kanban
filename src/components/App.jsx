import React from 'react'
import Board from './Board'

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'A' },
    'task-2': { id: 'task-2', content: 'B' },
    'task-3': { id: 'task-3', content: 'C' },
    'task-4': { id: 'task-4', content: 'D' },
    'task-5': { id: 'task-5', content: 'E' },
    'task-6': { id: 'task-6', content: 'F' },
    'task-7': { id: 'task-7', content: 'G' },
    'task-8': { id: 'task-8', content: 'H' },
    'task-9': { id: 'task-9', content: 'I' },
    'task-10': { id: 'task-10', content: 'J' },
    'task-11': { id: 'task-11', content: 'K' },
    'task-12': { id: 'task-12', content: 'L' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6', 'task-7', 'task-8', 'task-9', 'task-10', 'task-11', 'task-12']
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
}

function App () {
  return (
    <Board initialData={initialData} />
  )
}

export default App
