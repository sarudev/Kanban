import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import '../css/App.css'

const Container = styled.div`
  position: relative;
  outline: 1px solid var(${props => props.isDragging ? '--focus-outline' : '--outline'});
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: var(--bg-color);
  display: flex;
`
const Icon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  text-align: center;
  top: calc(50% - 12px);
`
const TextContent = styled.div`
  position: relative;
  width: ${props => props.icon ? 85 : 100}%;
  margin-left: ${props => props.icon ? 8 : 0}px;
  user-select: ${props => props.icon ? 'text' : 'none'};
  text-align: center;
  word-wrap: break-word;
`

export default function Task ({ task, index, isDragDisabled, showIcon }) {
  const icon = (provided) => (
    <div {...(showIcon ? provided.dragHandleProps : null)}>
      <Icon>
        <i className='icon icon-animation bx bx-menu' />
      </Icon>
    </div>
  )

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...(showIcon ? null : provided.dragHandleProps)}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          id={task.id}
          className='task'
        >
          {showIcon && icon(provided)}
          <TextContent icon={showIcon}>
            {task.content}
          </TextContent>
        </Container>
      )}
    </Draggable>
  )
}
Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isDragDisabled: PropTypes.bool.isRequired,
  showIcon: PropTypes.bool.isRequired
}
