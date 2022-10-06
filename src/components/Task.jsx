import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import 'boxicons'
import '../css/App.css'

const Container = styled.div`
  outline: 1px solid var(${props => props.isDragging ? '--focus-outline' : '--outline'});
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: var(--bg-color);
  user-select: text;
  display: flex;
`
const Icon = styled.div`
  width: 24px;
  height: 24px;
  text-align: center;
  position: relative;
  top: calc(50% - 12px);
`

export default function Task ({ task, index, isDragDisabled }) {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          <div {...provided.dragHandleProps}>
            <Icon>
              <i className='icon icon-animation bx bx-menu' />
            </Icon>
          </div>
          <div style={{ marginLeft: '8px', userSelect: 'text', textAlign: 'initial' }}>{task.content}</div>
        </Container>
      )}
    </Draggable>
  )
}
Task.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
  isDragDisabled: PropTypes.bool
}
