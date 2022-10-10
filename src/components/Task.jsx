import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import '../css/App.css'
import { setContextMenuId } from '../redux/reducers/contextMenuId'
import { useDispatch } from 'react-redux'

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
  let moved = false
  const dispatch = useDispatch()

  const onAuxClick = e => {
    e.preventDefault()
    console.log(task.id)
    dispatch(setContextMenuId(task.id))

    const contextMenu = document.getElementById('context-menu')

    contextMenu.style.display = 'flex'
    contextMenu.style.top = `${e.clientY}px`
    contextMenu.style.left = `${e.clientX}px`
  }

  const onContextMenu = e => e.preventDefault()

  const onTouchStart = e => {
    const contextMenu = document.getElementById('context-menu')

    contextMenu.style.top = `${e.touches[0].clientY}px`
    contextMenu.style.left = `${e.touches[0].clientX}px`
  }

  const onTouchMove = () => { moved = true }

  const onTouchEnd = () => {
    if (moved) {
      moved = false
    } else {
      document.getElementById('context-menu').style.display = 'flex'
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
          onAuxClick={onAuxClick}
          onContextMenu={onContextMenu}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
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
