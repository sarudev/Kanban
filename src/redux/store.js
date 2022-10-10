import { configureStore } from '@reduxjs/toolkit'
import contextMenuId from './reducers/contextMenuId'
import tasks from './reducers/tasksSlice'
import columns from './reducers/columnsSlice'
import isDragging from './reducers/isDraggingSlice'

export const store = configureStore({
  reducer: {
    contextMenuId,
    tasks,
    columns,
    isDragging
  }
})
