import React, { useRef } from 'react'
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

export default function TextArea () {
  const textAreaRef = useRef()
  const controlRef = useRef(false)

  const keydown = e => {
    if (e.key === 'Control') {
      e.preventDefault()
      controlRef.current = true
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (controlRef.current) {
        console.log('send!')
        textAreaRef.current.value = ''
      }
    }
  }

  const keyup = e => {
    if (e.key === 'Control') {
      e.preventDefault()
      controlRef.current = false
    }
  }

  return (
    <Container>
      <Text ref={textAreaRef} maxLength={200} onKeyDown={keydown} onKeyUp={keyup} placeholder='Enter task text here...' />
    </Container>
  )
}
