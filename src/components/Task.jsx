import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import '../css/App.css'
import { setContextMenuId } from '../redux/reducers/contextMenuId'
import { useDispatch, useSelector } from 'react-redux'
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
  const contextMenuOpen = useSelector(state => state.contextMenuOpen)
  const dispatch = useDispatch()
  let moved = false

  const handleOnAuxClick = e => {
    e.preventDefault()
    dispatch(setContextMenuId(task.id))

    const contextMenu = document.getElementById('context-menu')

    contextMenu.style.display = 'flex'
    dispatch(setContextMenuOpen(true))
    contextMenu.style.top = `${e.clientY}px`
    contextMenu.style.left = `${e.clientX}px`
  }

  const handleOnTouchStart = e => {
    if (!e.target.id.startsWith('context-menu')) {
      const contextMenu = document.getElementById('context-menu')
      if (contextMenuOpen.current) {
        contextMenu.style.display = 'none'
      }
      contextMenu.style.top = `${e.touches[0].clientY}px`
      contextMenu.style.left = `${e.touches[0].clientX}px`
    }
  }
  const handleOnTouchMove = e => {
    moved = true
    if (!e.target.id.startsWith('context-menu')) {
      dispatch(setContextMenuOpen(false))
    }
  }
  const handleOnTouchEnd = e => {
    if (moved) {
      moved = false
    } else if (!contextMenuOpen.current && e.target.id !== 'task-creator') {
      document.getElementById('context-menu').style.display = 'flex'
      dispatch(setContextMenuOpen(true))
      dispatch(setContextMenuId(task.id))
    }
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
          onTouchStart={handleOnTouchStart}
          onTouchMove={handleOnTouchMove}
          onTouchEnd={handleOnTouchEnd}
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
