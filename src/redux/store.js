import { configureStore } from '@reduxjs/toolkit'
import contextMenuId from './reducers/contextMenuId'
import tasks from './reducers/tasksSlice'
import columns from './reducers/columnsSlice'
import isDragging from './reducers/isDraggingSlice'
import contextMenuOpen from './reducers/contextMenuOpenSlice'
import taskInputId from './reducers/taskInputIdSlice'

export const store = configureStore({
  reducer: {
    contextMenuId,
    tasks,
    columns,
    isDragging,
    contextMenuOpen,
    taskInputId
  }
})
