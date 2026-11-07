import { combineReducers } from '@reduxjs/toolkit'
import data from './dataReducer'
import ui from './uiReducer'

export const rootReducer = combineReducers({ data, ui })

export type RootState = ReturnType<typeof rootReducer>

export * from './dataReducer'
export * from './uiReducer'
