import React from 'react'
import Task from './Task'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 10px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#191919' : '#242424')};
  flex-grow: 1;
  margin: 10px;
  border-radius: 15px;
  min-height: 700px;
`

export default function Board ({ className, id, columnId, title, tasks }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

Board.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired
}
