import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import '../css/App.css'
import { setContextMenuId } from '../redux/reducers/contextMenuId'
import { useDispatch } from 'react-redux'
import { setContextMenuOpen } from '../redux/reducers/contextMenuOpenSlice'

const Container = styled.div`
  position: relative;
  outline: 1px solid var(${props => props.isDragging ? '--focus-outline' : '--outline'});
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: var(--bg-color);
  text-align: center;
  word-wrap: break-word;
`

export default function Task ({ task, index, isDragDisabled }) {
  const dispatch = useDispatch()

  const handleOnAuxClick = e => {
    e.preventDefault()
    dispatch(setContextMenuId(task.id))

    const contextMenu = document.getElementById('context-menu')

    contextMenu.style.display = 'flex'
    dispatch(setContextMenuOpen(true))
    contextMenu.style.top = `${e.clientY}px`
    contextMenu.style.left = `${e.clientX}px`
  }

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          id={task.id}
          className='task'
          onAuxClick={handleOnAuxClick}
          onContextMenu={e => e.preventDefault()}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}
Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isDragDisabled: PropTypes.bool.isRequired
}
