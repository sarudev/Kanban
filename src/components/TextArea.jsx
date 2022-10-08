import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

export default function TextArea ({ addTask }) {
  const [limitCounter, setLimitCounter] = useState(0)
  const textAreaRef = useRef()
  const maxLength = 150

  useEffect(() => {
    // if (textAreaRef.current.value.length === )
  }, [limitCounter])

  const keydown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (textAreaRef.current.value.length < 1) {
        return
      }
      addTask(textAreaRef.current.value)
      textAreaRef.current.value = ''
      setLimiter()
    }
  }

  const setLimiter = () => {
    setLimitCounter(textAreaRef.current.value.length)
  }

  return (
    <Container>
      <Counter value={limitCounter} maxLength={maxLength}>{limitCounter}/{maxLength}</Counter>
      <Text id='task-creator' ref={textAreaRef} maxLength={maxLength} onKeyDown={keydown} placeholder='Enter task content here.&#10;Press enter to add.' onChange={setLimiter} />
    </Container>
  )
}
TextArea.propTypes = {
  addTask: PropTypes.func.isRequired
}
