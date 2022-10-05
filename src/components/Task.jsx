import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid ${(props) => props.isDragging ? 'magenta' : 'lightgrey'};
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #242424;
`

export default function Task ({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}
Task.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number
}
