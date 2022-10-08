import React from 'react'
import Board from './Board'
import styled from 'styled-components'

const columns = {
  'column-1': {
    id: 'column-1',
    title: 'To do',
    taskIds: []
  },
  'column-2': {
    id: 'column-2',
    title: 'WIP',
    taskIds: []
  },
  'column-3': {
    id: 'column-3',
    title: 'Testing',
    taskIds: []
  },
  'column-4': {
    id: 'column-4',
    title: 'Done',
    taskIds: []
  }
}

const ContextMenu = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
  z-index: 10;
`

function App () {
  return (
    <>
      <ContextMenu onContextMenu={e => e.preventDefault()} id='context-menu' hidden>
        a
      </ContextMenu>
      <Board initialColumns={columns} />
    </>
  )
}

export default App
