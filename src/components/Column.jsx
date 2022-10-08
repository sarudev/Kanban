import React, { useEffect } from 'react'
import Task from './Task'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  outline: 1px solid lightgrey;
  border-radius: 10px;
  width: 284px;
  height: 484px;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 4px;
`
const TaskList = styled.div`
  padding: 10px;
  transition: background-color 0.2s ease, outline .2s ease;
  background-color: var(${props => props.isDraggingOver ? '--disabled-bg-color' : '--bg-color'});
  outline: 1px var(${props => (props.isDraggingOver ? '--focus-board-outline-color' : '--bg-color')}) solid;
  margin: 10px;
  border-radius: 15px;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`

const observerTop = new window.IntersectionObserver(e => observer(e, 'borderTop'), { threshold: [1] })
const observerDown = new window.IntersectionObserver(e => observer(e, 'borderBottom'), { threshold: [1] })
function observer (entries, where) {
  if (entries[0].target.offsetParent == null) {
    return
  }
  entries[0].isIntersecting
    ? entries[0].target.offsetParent.style[where] = ''
    : entries[0].target.offsetParent.style[where] = '2px var(--focus-outline) solid'
}

export default function Column ({ columnId, title, tasks, isDragging, handleContextMenu }) {
  useEffect(() => {
    if (tasks.length > 0) {
      ;[...document.getElementById(columnId).childNodes[1].childNodes].forEach(el => {
        observerTop.unobserve(el)
        observerDown.unobserve(el)
      })

      observerTop.observe(document.getElementById(tasks[0].id))
      observerDown.observe(document.getElementById(tasks.at(-1).id))
    }
  })

  return (
    <Container id={columnId}>
      <Title>{title}</Title>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} isDragDisabled={isDragging && snapshot.draggingFromThisWith !== task.id} handleContextMenu={handleContextMenu} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  isDragging: PropTypes.bool.isRequired,
  handleContextMenu: PropTypes.func
}
