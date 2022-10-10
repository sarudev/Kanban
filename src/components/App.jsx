import React, { useEffect } from 'react'
import Board from './Board'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setContextMenuId } from '../redux/reducers/contextMenuId'

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
  const contextMenuId = useSelector(state => state.contextMenuId)
  const dispatch = useDispatch()

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
        console.log()
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
    // const keydownFunc = e => {
    //   console.log(e.key)
    //   if (e.key === 'Alt') {
    //     document.getElementById('context-menu').style.display = 'none'
    //   }
    // }

    document.addEventListener('mousedown', clickFunc)
    document.addEventListener('touchstart', touchFunc)
    // document.addEventListener('keypress', keydownFunc)
    return () => {
      document.removeEventListener('mousedown', clickFunc)
      document.removeEventListener('touchstart', touchFunc)
      document.removeEventListener('touchend', clickFunc)
      // document.removeEventListener('keypress', keydownFunc)
    }
  }, [])

  return (
    <>
      <ContextMenu
        onContextMenu={e => e.preventDefault()}
        id='context-menu'
      >
        {contextMenuId !== '' && (
          <Button
            className='context-menu-b'
            onClick={e => {
              navigator.clipboard.writeText(document.getElementById(contextMenuId).textContent)
              e.target.offsetParent.style.display = 'none'
              dispatch(setContextMenuId(''))
              console.log('coppied')
            }}
          >
            Copiar
          </Button>
        )}
        {contextMenuId === '' && (
          <Button
            className='context-menu-b'
            onClick={e => {
              e.target.offsetParent.style.display = 'none'
              console.log('pasted')
            }}
          >
            Pegar
          </Button>
        )}
        {contextMenuId !== '' && (
          <Button
            className='context-menu-b'
            onClick={e => {
              e.target.offsetParent.style.display = 'none'
              dispatch(setContextMenuId(''))
              console.log('cutted')
            }}
          >
            Cortar
          </Button>
        )}
      </ContextMenu>
      <Board />
    </>
  )
}

export default App
