import { displayListWorkoutSlice } from '../../features/display-list-workout/redux/slice'
import { Middleware } from '@reduxjs/toolkit'
import { loadWorkoutsFromLocalStorage, syncWorkoutsWithLocalStorage } from './middlewares/workoutsMiddleware'

export const localStorageMiddleware: Middleware =
    ({ getState }) =>
    next =>
    action => {
        const result = next(action)
        syncWorkoutsWithLocalStorage(getState)
        return result
    }

export const loadFromLocalStorage: any = () => {
    // Загрузка данных
    // const accessTokenData = localStorage.getItem('access_token')
    // const refreshTokenData = localStorage.getItem('refresh_token')
    const workoutsData = loadWorkoutsFromLocalStorage()

    // Формирование объекта начального состояния
    const state: any = {}

    // if (accessTokenData !== null) {
    //     state.auth = {
    //         ...globalInitialStates.auth,
    //         access_token: accessTokenData,
    //         refresh_token: refreshTokenData,
    //     }
    // }

    if (workoutsData.length > 0) {
        state.displayListWorkout = { ...displayListWorkoutSlice, workouts: workoutsData }
    }

    // Возврат сформированного начального состояния
    return state
}
