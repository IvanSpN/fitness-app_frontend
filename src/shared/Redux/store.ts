import { localStorageMiddleware, loadFromLocalStorage } from './middleWares'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import workoutsList from '../../features/WorkoutsList/redux/slice'
import createWorkout from '../../features/create-workout/redux/slice'

export const store = configureStore({
    reducer: combineReducers({
        workoutsList,
        createWorkout
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
