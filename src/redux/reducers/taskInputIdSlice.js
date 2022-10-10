import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const taskInputIdSlice = createSlice({
  name: 'taskInputIdSlice',
  initialState,
  reducers: {
    setTaskInputId: (state, { payload }) => payload
  }
})

export const { setTaskInputId } = taskInputIdSlice.actions

export default taskInputIdSlice.reducer
