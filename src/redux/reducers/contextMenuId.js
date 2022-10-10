import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const taskIdContextMenuSlice = createSlice({
  name: 'taskIdContextMenu',
  initialState,
  reducers: {
    setContextMenuId: (state, { payload }) => payload
  }
})

export const { setContextMenuId } = taskIdContextMenuSlice.actions

export default taskIdContextMenuSlice.reducer
