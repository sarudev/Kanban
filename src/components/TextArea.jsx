import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../redux/reducers/tasksSlice'
import { addTaskId } from '../redux/reducers/columnsSlice'
import { setContextMenuOpen } from '../redux/reducers/contextMenuOpenSlice'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const Counter = styled.div`
  width: 7ch;
  position: absolute;
  top: 51px;
  left: 1102px;
  font-size: 15px;
  color: var(${p => p.counter === p.maxLength ? '--warning' : '--limit'});
  text-align: end;
`
const Text = styled.textarea` 
  width: 100%;
  height: 100%;
  resize: none;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  font-size: 19px;
  background-color: var(--bg-color);
  outline: 1px grey solid;
  transition: outline .5s ease, background-color 1s ease;
  &:focus {
    background-color: var(--disabled-bg-color);
    outline: 1px var(--focus-board-outline-color) solid;
  }
`

export default function TextArea () {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const [limitCounter, setLimitCounter] = useState(0)
  const textAreaRef = useRef()
  const maxLength = 200

  const handleKeydown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (textAreaRef.current.value.length < 1) {
        return
      }

      const taskId = 'task-' + (+tasks[Object.keys(tasks).at(-1)]?.id?.split('-')?.[1] + 1 || 1)
      dispatch(addTask({ id: taskId, content: textAreaRef.current.value }))
      dispatch(addTaskId(taskId))
      textAreaRef.current.value = ''
      setLimitCounter(textAreaRef.current.value.length)
    }
  }

  const handleOnFocus = () => {
    document.getElementById('context-menu').style.display = 'none'
    dispatch(setContextMenuOpen(true))
  }

  return (
    <Container>
      <Counter
        value={limitCounter}
        maxLength={maxLength}
      >
        {limitCounter}/{maxLength}
      </Counter>
      <Text
        id='area-task-creator'
        ref={textAreaRef}
        maxLength={maxLength}
        onKeyDown={handleKeydown}
        onFocus={handleOnFocus}
        placeholder='Enter task content here.&#10;Press enter to add.'
        onChange={() => setLimitCounter(textAreaRef.current.value.length)}
      />
    </Container>
  )
}
