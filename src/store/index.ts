import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/store/reducers'

export type { RootState } from '@/store/reducers'

/** Un store par session connectée. */
export const createAppStore = () => configureStore({ reducer: rootReducer })

export type AppStore = ReturnType<typeof createAppStore>
export type AppDispatch = AppStore['dispatch']
