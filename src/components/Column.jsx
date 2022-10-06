import React from 'react'
import Task from './Task'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  width: 285px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 4px;
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

export default function Column ({ className, id, columnId, title, tasks, isDragging }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} isDragDisabled={isDragging && snapshot.draggingFromThisWith !== task.id} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

Column.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  isDragging: PropTypes.bool.isRequired
}
