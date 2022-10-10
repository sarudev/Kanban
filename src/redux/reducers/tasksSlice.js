import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state[payload.id] = payload
    },
    removeTask: (state, { payload }) => {
      delete state[payload]
    }
  }
})

export const { addTask, removeTask } = tasksSlice.actions

export default tasksSlice.reducer
