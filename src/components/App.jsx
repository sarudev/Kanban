import React from 'react'
import Board from './Board'

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Conectar la base de datos mongoBd' },
    'task-2': { id: 'task-2', content: 'Buscar' },
    'task-3': { id: 'task-3', content: 'Estilizar la pagina' },
    'task-4': { id: 'task-4', content: 'Hacer el DnD' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
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
