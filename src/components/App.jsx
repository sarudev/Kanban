import React, { useEffect, useRef } from 'react'
import Board from './Board'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setContextMenuId } from '../redux/reducers/contextMenuId'
import { addTask, removeTask } from '../redux/reducers/tasksSlice'
import { addTaskIdInColumn, removeTaskId } from '../redux/reducers/columnsSlice'

const AppContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`
const ContextMenu = styled.div`
  position: absolute;
  background-color: #202020;
  border-radius: 0 10px 10px;
  outline: 2px #907AD6 solid;
  z-index: 10;
  width: var(--btn-width);
  height: auto;
  padding: var(--btn-pad-mar);
  display: none;
  flex-direction: column;
  justify-content: space-between;
`
const Button = styled.div`
  max-width: calc(var(--btn-width) - (var(--btn-pad-mar) * 2));
  height: var(--btn-height);
  line-height: var(--btn-height);
  margin: var(--btn-pad-mar);
  text-align: center;
  border-radius: 10px;
  outline: 1px var(--outline) solid;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    outline: 1px var(--focus-outline) solid;
  }
  &:active {
    outline: 2px var(--focus-board-outline-color) solid;
  }
`

function App () {
  const tasks = useSelector(state => state.tasks)
  const contextMenuId = useSelector(state => state.contextMenuId)
  const dispatch = useDispatch()
  let control = useRef(false)

  const addTaskFunc = async () => {
    const data = await navigator.clipboard.readText()
    if (data.length < 1 || data.length > 200) {
      return
    }

    const taskId = 'task-' + (+tasks[Object.keys(tasks).at(-1)]?.id?.split('-')?.[1] + 1 || 1)
    dispatch(addTask({ id: taskId, content: data }))
    dispatch(addTaskIdInColumn({ id: 'column-1', taskId }))
  }

  useEffect(() => {
    const clickFunc = e => {
      const contextMenu = document.getElementById('context-menu')
      const textArea = document.getElementById('task-creator')
      const tasksIds = [...document.getElementsByClassName('task')].map(e => e.id)

      if (e.touches) {
        if (e.target.id !== textArea.id) {
          textArea.blur()
        } else {
          return
        }
        if (e.target.classList.contains('context-menu-b')) {
          return
        }
        e.preventDefault()
        document.removeEventListener('touchend', clickFunc)
        document.addEventListener('mousedown', clickFunc)
        if (
          e.target.id !== contextMenu.id &&
          !e.target.classList.contains('context-menu-b') &&
          (
            !tasksIds.includes(e.target.id || e.target.offsetParent?.id) &&
            !e.target.classList.contains('column')
          )
        ) {
          contextMenu.style.display = 'none'
          dispatch(setContextMenuId(''))
        }
      } else {
        if (e.target.id !== contextMenu.id && !e.target.classList.contains('context-menu-b')) {
          contextMenu.style.display = 'none'
          dispatch(setContextMenuId(''))
        }
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

  const handleOnAuxClickCopy = e => {
    navigator.clipboard.writeText(document.getElementById(contextMenuId.taskId).textContent)
    e.target.offsetParent.style.display = 'none'
    dispatch(setContextMenuId({ columnId: '', taskId: '' }))
  }
  const handleOnAuxClickCut = e => {
    e.target.offsetParent.style.display = 'none'
    dispatch(setContextMenuId({ columnId: '', taskId: '' }))
    dispatch(removeTask(contextMenuId.taskId))
    dispatch(removeTaskId(contextMenuId))
  }
  const handleOnAuxClickPaste = async e => {
    e.target.offsetParent.style.display = 'none'
    await addTaskFunc()
  }

  return (
    <AppContainer
      tabIndex='0'
      onKeyUp={e => {
        if (e.key === 'Control') {
          control = false
        }
      }}
      onKeyDown={async e => {
        if (e.key === 'Control') {
          control = true
        }
        if (e.key.toLowerCase() === 'v' && control) {
          await addTaskFunc()
        }
      }}
    >
      <ContextMenu
        onContextMenu={e => e.preventDefault()}
        id='context-menu'
      >
        {contextMenuId.taskId !== '' && (
          <>
            <Button
              className='context-menu-b'
              onClick={handleOnAuxClickCopy}
            >
              Copy
            </Button>
            <Button
              className='context-menu-b'
              onClick={handleOnAuxClickCut}
            >
              Cut
            </Button>
          </>
        )}
        {contextMenuId.taskId === '' && contextMenuId.columnId !== '' && (
          <Button
            className='context-menu-b'
            onClick={handleOnAuxClickPaste}
          >
            Paste
          </Button>
        )}
      </ContextMenu>
      <Board />
    </AppContainer>
  )
}

export default App
