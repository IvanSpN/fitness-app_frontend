import { localStorageMiddleware, loadFromLocalStorage } from './middleWares';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import exercisesList from '../../components/ExercisesList/redux/slice'
import configuredWorkoutList from '../../components/ConfiguredWorkoutList/redux/slice'
import dataSetup from '../../components/DataSetup/redux/slice'
import workoutsList from '../../components/WorkoutsList/redux/slice'


export const store = configureStore({
    reducer: combineReducers({
        exercisesList,
        configuredWorkoutList,
        dataSetup,
        workoutsList,
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
