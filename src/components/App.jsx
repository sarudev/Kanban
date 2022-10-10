import React, { useRef } from 'react'
import Board from './Board'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setContextMenuId } from '../redux/reducers/contextMenuId'
import { addTask, removeTask } from '../redux/reducers/tasksSlice'
import { addTaskId, removeTaskId } from '../redux/reducers/columnsSlice'
import { setContextMenuOpen } from '../redux/reducers/contextMenuOpenSlice'

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
  const contextMenuOpen = useSelector(state => state.contextMenuOpen)
  const dispatch = useDispatch()
  const contextMenuControl = useRef(false)
  const contextMenuMoved = useRef(false)
  const contextMenuRef = useRef()

  const addTaskFunc = async () => {
    const data = await navigator.clipboard.readText()
    if (data.length < 1 || data.length > 200) {
      return
    }

    const taskId = 'task-' + (+Object.keys(tasks).at(-1)?.split('-')?.[1] + 1 || 1)
    dispatch(addTask({ id: taskId, content: data }))
    dispatch(addTaskId(taskId))
  }

  const handleCopy = e => {
    e.target.offsetParent.style.display = 'none'
    dispatch(setContextMenuOpen(false))

    navigator.clipboard.writeText(document.getElementById(contextMenuId).textContent)
  }
  const handleEdit = e => {
    e.target.offsetParent.style.display = 'none'
    dispatch(setContextMenuOpen(false))

    const data = document.getElementById(contextMenuId).innerText

    console.log(data)
  }
  const handleCut = e => {
    e.target.offsetParent.style.display = 'none'
    dispatch(setContextMenuOpen(false))

    dispatch(removeTask(contextMenuId))
    dispatch(removeTaskId(contextMenuId))
  }
  const handlePaste = async e => {
    e.target.offsetParent.style.display = 'none'
    dispatch(setContextMenuOpen(false))

    await addTaskFunc()
  }

  const handleOnClick = e => {
    if (contextMenuOpen && !e.target.id.startsWith('context-menu') && e.target.id !== 'task-creator') {
      if (e.target.id.startsWith('task-')) {
        contextMenuRef.current.style.display = 'inherit'
        dispatch(setContextMenuOpen(true))
        dispatch(setContextMenuId(e.target.id.startsWith('task-') && e.target.id !== 'task-creator' ? e.target.id : ''))
      } else {
        (contextMenuRef.current.style.display = 'none')
        dispatch(setContextMenuOpen(false))
        dispatch(setContextMenuId(''))
      }
    }
  }
  const handleOnAuxClick = e => {
    e.preventDefault()
    if (e.target.id.startsWith('task-')) {
      return
    }
    dispatch(setContextMenuId(''))

    contextMenuRef.current.style.display = 'flex'
    dispatch(setContextMenuOpen(true))
    contextMenuRef.current.style.top = `${e.clientY}px`
    contextMenuRef.current.style.left = `${e.clientX}px`
  }

  const handleOnTouchStart = e => {
    if (!e.target.id.startsWith('context-menu')) {
      if (contextMenuOpen) {
        contextMenuRef.current.style.display = 'none'
      }
      contextMenuRef.current.style.top = `${e.touches[0].clientY}px`
      contextMenuRef.current.style.left = `${e.touches[0].clientX}px`
    }
  }
  const handleOnTouchMove = e => {
    contextMenuMoved.current = true
    if (!e.target.id.startsWith('context-menu')) {
      dispatch(setContextMenuOpen(false))
    }
  }
  const handleOnTouchEnd = e => {
    if (contextMenuMoved.current) {
      contextMenuMoved.current = false
    } else if (!contextMenuOpen && e.target.id !== 'task-creator') {
      contextMenuRef.current.style.display = 'flex'
      dispatch(setContextMenuOpen(true))
      dispatch(setContextMenuId(e.target.id.startsWith('task-') && e.target.id !== 'task-creator' ? e.target.id : ''))
    }
  }

  const handleOnKeyUp = e => {
    if (e.key === 'Control') {
      contextMenuControl.current = false
    }
  }
  const handleOnKeyDown = async e => {
    if (e.key === 'Control') {
      contextMenuControl.current = true
    }
    if (e.key.toLowerCase() === 'v' && contextMenuControl.current && document.getElementById('task-creator') !== document.activeElement) {
      await addTaskFunc()
    }
  }

  return (
    <AppContainer
      tabIndex='0'
      onClick={handleOnClick}
      onAuxClick={handleOnAuxClick}
      onContextMenu={e => e.preventDefault()}
      onTouchStart={handleOnTouchStart}
      onTouchMove={handleOnTouchMove}
      onTouchEnd={handleOnTouchEnd}
      onKeyUp={handleOnKeyUp}
      onKeyDown={handleOnKeyDown}
    >
      <ContextMenu
        ref={contextMenuRef}
        onContextMenu={e => e.preventDefault()}
        id='context-menu'
      >
        {contextMenuId !== '' && (
          <>
            <Button
              className='context-menu-btn'
              id='context-menu-btn-copy'
              onClick={handleCopy}
            >
              Copy
            </Button>
            <Button
              className='context-menu-btn'
              id='context-menu-btn-edit'
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              className='context-menu-btn'
              id='context-menu-btn-cut'
              onClick={handleCut}
            >
              Cut
            </Button>
          </>
        )}
        <Button
          className='context-menu-btn'
          id='context-menu-btn-paste'
          onClick={handlePaste}
        >
          Paste
        </Button>
      </ContextMenu>
      <Board />
    </AppContainer>
  )
}

export default App
