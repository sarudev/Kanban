import React, { useState } from 'react'
import Board from './Board'
import { DragDropContext } from 'react-beautiful-dnd'
import '../css/App.css'

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Conectar la base de datos' },
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
  const [state, setState] = useState(initialData)

  function handleOnDragEnd ({ destination, draggableId, source }) {
    if (!destination) { return }

    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    const startColumn = state.columns[source.droppableId]
    const finishColumn = state.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      }

      setState(newState)
    } else {
      const startTaskIds = Array.from(startColumn.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...startColumn,
        taskIds: startTaskIds
      }

      const finishTaskIds = Array.from(finishColumn.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)

      const newFinish = {
        ...finishColumn,
        taskIds: finishTaskIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      setState(newState)
    }
  }

  return (
    <div className='board'>
      <DragDropContext onDragEnd={result => handleOnDragEnd(result)}>
        {Object.values(state.columns).map((c, i) => (
          <Board key={i} className='board-section' id={c.id} columnId={c.id} title={c.title} tasks={c.taskIds.map(id => state.tasks[id])} />
        ))}
      </DragDropContext>
    </div>
  )
}

export default App
