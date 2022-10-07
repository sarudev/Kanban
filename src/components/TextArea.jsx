import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const Text = styled.textarea` 
  width: 100%;
  height: 100%;
  resize: none;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  font-size: 19px;
`
const Counter = styled.div`
  width: 7ch;
  position: absolute;
  top: 51px;
  left: 1102px;
  font-size: 15px;
  color: var(${props => props.counter === 200 ? '--warning' : '--limit'});
  text-align: end;
`

export default function TextArea ({ addTask }) {
  const [limitCounter, setLimitCounter] = useState(0)
  const textAreaRef = useRef()

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
      <Counter counter={limitCounter}>{limitCounter}/200</Counter>
      <Text ref={textAreaRef} maxLength={200} onKeyDown={keydown} placeholder='Enter task content here.&#10;Press enter to add.' onChange={setLimiter} />
    </Container>
  )
}
TextArea.propTypes = {
  addTask: PropTypes.func.isRequired
}
