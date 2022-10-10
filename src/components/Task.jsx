import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import '../css/App.css'
import { useSelector, useDispatch } from 'react-redux'

import { addTask, removeTask } from '../redux/reducers/tasksSlice'
import { setTaskInputId } from '../redux/reducers/taskInputIdSlice'
import { removeTaskId } from '../redux/reducers/columnsSlice'

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
const Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 20px;
  display: none;
`
const TaskTextContainer = styled.div`
`

export default function Task ({ task, index, isDragDisabled }) {
  const [text, setText] = useState(task.content)
  const taskInputId = useSelector(state => state.taskInputId)
  const dispatch = useDispatch()

  const handleOnKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (text.length === 0) {
        dispatch(removeTask(task.id))
        dispatch(removeTaskId(task.id))
      } else {
        dispatch(addTask({ id: task.id, content: text }))
      }
      e.target.style.display = 'none'
      document.getElementById('content-' + task.id).style.display = 'inherit  '
    }
  }

  const handleOnChange = e => {
    setText(e.target.value)
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
        >
          <Input
            id={'input-' + task.id}
            className='input-tasks'
            value={text}
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChange}
          />
          <TaskTextContainer
            id={'content-' + task.id}
          >
            {task.content}
          </TaskTextContainer>
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
