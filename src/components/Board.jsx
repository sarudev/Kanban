import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Column from './Column'
import TextArea from './TextArea'
import { useSelector, useDispatch } from 'react-redux'
import { moveTaskId } from '../redux/reducers/columnsSlice'
import { setIsDragging } from '../redux/reducers/isDraggingSlice'

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  min-height: 500px;
  max-height: 608px;
  display: flex;
  flex-direction: column;
`
const UpDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
`
const DownDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  height: 100px;
  background-color: var(--bg-color);
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  outline: 1px var(--outline) solid;
`

export default function Board () {
  const tasks = useSelector(state => state.tasks)
  const columns = useSelector(state => state.columns)
  const dispatch = useDispatch()

  const handleOnDragEnd = ({ source, destination, draggableId }) => {
    dispatch(setIsDragging(false))

    if (!destination) { return }

    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    dispatch(moveTaskId({
      columns: {
        from: source.droppableId,
        to: destination.droppableId
      },
      index: {
        from: source.index,
        to: destination.index
      },
      taskId: draggableId
    }))
  }

  return (
    <Container>
      <DragDropContext
        onDragStart={(result) => dispatch(setIsDragging(true))}
        onDragEnd={handleOnDragEnd}
      >
        <UpDiv>
          {Object.values(columns).map((c, i) => {
            return (
              <Column
                key={i}
                columnId={c.id}
                title={c.title}
                tasks={c.taskIds.map(id => tasks[id])}
              />
            )
          })}
        </UpDiv>
        <DownDiv>
          <TextArea />
        </DownDiv>
      </DragDropContext>
    </Container>
  )
}
