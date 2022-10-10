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
      state[payload] = undefined
    }
  }
})

export const { addTask, removeTask } = tasksSlice.actions

export default tasksSlice.reducer
