import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Column from './Column'

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  height: 500px;
  display: flex;
  flex-direction: row;
`
const UpDiv = styled.div`
  max-width: 1200px;
  height: 400px;
  display: flex;
  flex-direction: row;
`

export default function Board ({ initialData }) {
  const [state, setState] = useState(initialData)
  const [dragging, setDragging] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

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
        <UpDiv>
          {Object.values(state.columns).map((c, i) => (
            <Column key={i} columnId={c.id} title={c.title} tasks={c.taskIds.map(id => state.tasks[id])} isDragging={dragging} showIcon={showIcon} />
          ))}
        </UpDiv>
        <button style={{ height: '100%', margin: 8 }} onClick={() => setShowIcon(prev => !prev)}>Activate handle</button>
      </DragDropContext>
    </Container>
  )
}
Board.propTypes = {
  initialData: PropTypes.object.isRequired
}
