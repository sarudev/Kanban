import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const isDraggingSlice = createSlice({
  name: 'isDragging',
  initialState,
  reducers: {
    setIsDragging: (state, { payload }) => payload,
    toggleIsDragging: (state, { payload }) => !state
  }
})

export const { setIsDragging, toggleIsDragging } = isDraggingSlice.actions

export default isDraggingSlice.reducer
