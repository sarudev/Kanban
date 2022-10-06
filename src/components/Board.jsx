import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import style from 'styled-components'
import PropTypes from 'prop-types'
import Column from './Column'

const Container = style.div`
  max-width: 1200px;
  display: inline-flex;
`

export default function Board ({ initialData }) {
  const [state, setState] = useState(initialData)
  const [dragging, setDragging] = useState(false)

  function handleOnDragEnd ({ destination, draggableId, source }) {
    setDragging(false)
    ;[...document.querySelectorAll('.bx-menu')].forEach(e => e.classList.toggle('icon-animation'))
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

  const onDragStart = (result) => {
    setDragging(true)
    ;[...document.querySelectorAll('.bx-menu')].forEach(e => e.classList.toggle('icon-animation'))
  }

  return (
    <Container>
      <DragDropContext
        onDragStart={(result) => onDragStart(result)}
        onDragEnd={result => handleOnDragEnd(result)}
      >
        {Object.values(state.columns).map((c, i) => (
          <Column key={i} className='board-section' id={c.id} columnId={c.id} title={c.title} tasks={c.taskIds.map(id => state.tasks[id])} isDragging={dragging} />
        ))}
      </DragDropContext>
    </Container>
  )
}
Board.propTypes = {
  initialData: PropTypes.object
}
