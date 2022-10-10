import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const contextMenuOpenSlice = createSlice({
  name: 'contextMenuOpen',
  initialState,
  reducers: {
    setContextMenuOpen: (state, { payload }) => payload
  }
})

export const { setContextMenuOpen } = contextMenuOpenSlice.actions

export default contextMenuOpenSlice.reducer
