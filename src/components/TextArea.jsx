import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
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

export default function TextArea ({ addTask }) {
  const textAreaRef = useRef()

  const keydown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTask(textAreaRef.current.value)
      textAreaRef.current.value = ''
    }
  }

  return (
    <Container>
      <Text ref={textAreaRef} maxLength={200} onKeyDown={keydown} placeholder='Enter task content here.&#10;Press enter to add.' />
    </Container>
  )
}
TextArea.propTypes = {
  addTask: PropTypes.func.isRequired
}
