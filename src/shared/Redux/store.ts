import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import exercisesList from '../../components/ExercisesList/redux/slice'
import configuredWorkoutList from '../../components/ConfiguredWorkoutList/redux/slice'

export const store = configureStore({
    reducer: {
        exercisesList,
        configuredWorkoutList,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type RootKeys = keyof RootState
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
