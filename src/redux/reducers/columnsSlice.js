import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addTaskIdInColumn: (state, { payload }) => {
      const { id, taskId } = payload
      if (!state[id].taskIds.includes(taskId)) {
        state[id].taskIds.push(taskId)
      }
    },
    moveTaskId: (state, { payload }) => {
      const { columns, index, taskId } = payload
      state[columns.from].taskIds.splice(index.from, 1)
      state[columns.to].taskIds.splice(index.to, 0, taskId)
    },
    removeTaskId: (state, { payload }) => {
      state[payload.columnId].taskIds = state[payload.columnId].taskIds.filter(t => t !== payload.taskId)
    }
  }
})

export const { addTaskIdInColumn, moveTaskId, removeTaskId } = columnsSlice.actions

export default columnsSlice.reducer
