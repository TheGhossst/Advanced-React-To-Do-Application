import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import authReducer from './authSlice'
import taskReducer from './taskSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        tasks: taskReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/setUser'],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch