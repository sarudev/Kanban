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
    addTaskId: (state, { payload }) => {
      if (!state['column-1'].taskIds.includes(payload)) {
        state['column-1'].taskIds.push(payload)
      }
    },
    moveTaskId: (state, { payload }) => {
      const { columns, index, taskId } = payload
      state[columns.from].taskIds.splice(index.from, 1)
      state[columns.to].taskIds.splice(index.to, 0, taskId)
    },
    removeTaskId: (state, { payload }) => {
      for (const columnId in state) {
        if (state[columnId].taskIds.includes(payload)) {
          state[columnId].taskIds = state[columnId].taskIds.filter(t => t !== payload)
          break
        }
      }
    }
  }
})

export const { addTaskId, moveTaskId, removeTaskId } = columnsSlice.actions

export default columnsSlice.reducer
