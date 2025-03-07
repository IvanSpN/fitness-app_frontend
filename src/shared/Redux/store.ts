import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { localStorageMiddleware, loadFromLocalStorage } from './middleWares'
import createWorkout from '../../features/create-workout/redux/slice'
import displayListWorkout from '../../features/display-list-workout/redux/slice'
import editWorkout from '../../features/edit-workout/redux/slice'
import homeInfo from '../../features/home-info/redux/slice'

export const store = configureStore({
    reducer: combineReducers({
        createWorkout,
        displayListWorkout,
        editWorkout,
        homeInfo,
    }),
    preloadedState: loadFromLocalStorage(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type RootKeys = keyof RootState
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
