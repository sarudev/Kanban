import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Column from './Column'
import TextArea from './TextArea'

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  min-height: 500px;
  max-height: 608px;
  display: flex;
  flex-direction: column;
`
const UpDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
`
const DownDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  height: 100px;
  background-color: var(--bg-color);
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  outline: 1px var(--outline) solid;
`

export default function Board ({ initialColumns, handleContextMenu }) {
  const [tasks, setTasks] = useState({})
  const [columns, setColumns] = useState(initialColumns)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const clickFunc = e => {
      const contextMenu = document.getElementById('context-menu')
      const textArea = document.getElementById('task-creator')
      const tasksIds = [...document.getElementsByClassName('task')].map(e => e.id)

      if (e.touches) {
        if (e.target.id !== textArea.id) { textArea.blur() } else { return }
        e.preventDefault()
        document.removeEventListener('touchend', clickFunc)
        document.addEventListener('mousedown', clickFunc)
      }
      if (e.target.id !== contextMenu.id && !tasksIds.includes(e.target.id || e.target.offsetParent?.id)) {
        contextMenu.hidden = true
      }
    }
    const touchFunc = e => {
      document.removeEventListener('mousedown', clickFunc)
      document.addEventListener('touchend', clickFunc)
    }

    document.addEventListener('mousedown', clickFunc)
    document.addEventListener('touchstart', touchFunc)
    return () => {
      document.removeEventListener('mousedown', clickFunc)
      document.removeEventListener('touchstart', touchFunc)
      document.removeEventListener('touchend', clickFunc)
    }
  }, [])

  const addTask = (taskContent) => {
    const lastTaskId = +tasks[Object.keys(tasks).at(-1)]?.id?.split('-')?.[1] + 1 || 1
    const newTask = {
      id: `task-${lastTaskId}`,
      content: taskContent
    }

    const newTasksState = {
      ...tasks,
      [newTask.id]: newTask
    }

    setTasks(newTasksState)

    const newColumnsState = {
      ...columns,
      'column-1': {
        ...columns['column-1'],
        taskIds: [...columns['column-1'].taskIds, newTask.id]
      }
    }

    setColumns(newColumnsState)
  }

  const handleOnDragEnd = ({ destination, draggableId, source }) => {
    setDragging(false)
    ;[...document.querySelectorAll('.bx-menu')].forEach(e => e.classList.toggle('icon-animation'))

    if (!destination) { return }

    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    const sourceColumn = columns[source.droppableId]
    const destinationColumn = columns[destination.droppableId]

    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds
      }

      const newColumnsState = {
        ...columns,
        [newColumn.id]: newColumn
      }

      setColumns(newColumnsState)
    } else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds)
      sourceTaskIds.splice(source.index, 1)

      const newSource = {
        ...sourceColumn,
        taskIds: sourceTaskIds
      }

      const destinationTaskIds = Array.from(destinationColumn.taskIds)
      destinationTaskIds.splice(destination.index, 0, draggableId)

      const newDestination = {
        ...destinationColumn,
        taskIds: destinationTaskIds
      }

      const newColumnsState = {
        ...columns,
        [newSource.id]: newSource,
        [newDestination.id]: newDestination
      }

      setColumns(newColumnsState)
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
          {Object.values(columns).map((c, i) => (
            <Column key={i} columnId={c.id} title={c.title} tasks={c.taskIds.map(id => tasks[id])} isDragging={dragging} handleContextMenu={handleContextMenu} />
          ))}
        </UpDiv>
        <DownDiv>
          <TextArea addTask={addTask} />
        </DownDiv>
      </DragDropContext>
    </Container>
  )
}
Board.propTypes = {
  initialColumns: PropTypes.object.isRequired,
  handleContextMenu: PropTypes.func
}
