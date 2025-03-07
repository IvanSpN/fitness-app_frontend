import { createAsyncThunk } from '@reduxjs/toolkit'
import { IExercisesListItemFromAPI, IExercisesListItemPushAPI } from './types'
import axios from 'axios'
import { INewWorkout } from '../../display-list-workout/redux/types'

export const getExercisesListItemsAPI = createAsyncThunk('exercises/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<IExercisesListItemFromAPI[]>(`http://localhost:5050/api/exercises/`)
        return data
    } catch (error: unknown) {
        // Проверка, является ли ошибка ошибкой axios
        if (axios.isAxiosError(error)) {
            // Мы можем проверить, если ошибка от axios, и, возможно, получить информацию из response
            if (error.response) {
                // Если есть ответ от сервера, можно отправить его сообщение
                return rejectWithValue(`Ошибка от сервера: ${error.response.data.message || 'Неизвестная ошибка'}`)
            } else if (error.request) {
                // Если запрос был выполнен, но ответа не было
                return rejectWithValue('Ошибка: Нет ответа от сервера')
            }
        } else if (error instanceof Error) {
            // Если ошибка обычная, стандартная ошибка JavaScript
            return rejectWithValue(error.message)
        }

        // В случае неизвестной ошибки
        return rejectWithValue('Неизвестная ошибка')
    }
})

export const addExerciseToBaseAPI = createAsyncThunk(
    'exercises/addExercise',

    async (newExercise: IExercisesListItemPushAPI, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<IExercisesListItemFromAPI>(
                `http://localhost:5050/api/exercises/`,
                newExercise
            )

            return data
        } catch (error: unknown) {
            // Проверка, является ли ошибка ошибкой axios
            if (axios.isAxiosError(error)) {
                // Мы можем проверить, если ошибка от axios, и, возможно, получить информацию из response
                if (error.response) {
                    // Если есть ответ от сервера, можно отправить его сообщение
                    return rejectWithValue(`Ошибка от сервера: ${error.response.data.message || 'Неизвестная ошибка'}`)
                } else if (error.request) {
                    // Если запрос был выполнен, но ответа не было
                    return rejectWithValue('Ошибка: Нет ответа от сервера')
                }
            } else if (error instanceof Error) {
                // Если ошибка обычная, стандартная ошибка JavaScript
                return rejectWithValue(error.message)
            }

            // В случае неизвестной ошибки
            return rejectWithValue('Неизвестная ошибка')
        }
    }
)

export const removeExerciseToBaseAPI = createAsyncThunk(
    'exercises/removeOne',
    async (uuid: string, { rejectWithValue }) => {
        try {
            await axios.delete<string>(`http://localhost:5050/api/exercises/${uuid}`)
            return uuid
        } catch (error: unknown) {
            // Проверка, является ли ошибка ошибкой axios
            if (axios.isAxiosError(error)) {
                // Мы можем проверить, если ошибка от axios, и, возможно, получить информацию из response
                if (error.response) {
                    // Если есть ответ от сервера, можно отправить его сообщение
                    return rejectWithValue(`Ошибка от сервера: ${error.response.data.message || 'Неизвестная ошибка'}`)
                } else if (error.request) {
                    // Если запрос был выполнен, но ответа не было
                    return rejectWithValue('Ошибка: Нет ответа от сервера')
                }
            } else if (error instanceof Error) {
                // Если ошибка обычная, стандартная ошибка JavaScript
                return rejectWithValue(error.message)
            }

            // В случае неизвестной ошибки
            return rejectWithValue('Неизвестная ошибка')
        }
    }
)

export const updateExercise = createAsyncThunk(
    'exercises/update',
    async (
        { uuid, updateExercise }: { uuid: string; updateExercise: Partial<IExercisesListItemFromAPI> },
        { rejectWithValue }
    ) => {
        try {
            const { data } = await axios.patch(`http://localhost:5050/api/exercises/${uuid}`, updateExercise)
            return data
        } catch (error: unknown) {
            // Проверка, является ли ошибка ошибкой axios
            if (axios.isAxiosError(error)) {
                // Мы можем проверить, если ошибка от axios, и, возможно, получить информацию из response
                if (error.response) {
                    // Если есть ответ от сервера, можно отправить его сообщение
                    return rejectWithValue(`Ошибка от сервера: ${error.response.data.message || 'Неизвестная ошибка'}`)
                } else if (error.request) {
                    // Если запрос был выполнен, но ответа не было
                    return rejectWithValue('Ошибка: Нет ответа от сервера')
                }
            } else if (error instanceof Error) {
                // Если ошибка обычная, стандартная ошибка JavaScript
                return rejectWithValue(error.message)
            }

            // В случае неизвестной ошибки
            return rejectWithValue('Неизвестная ошибка')
        }
    }
)

export const createWorkoutAPI = createAsyncThunk(
    'workout/create',
    async (workout: INewWorkout, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5050/api/workouts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workout),
            })

            if (!response.ok) {
                const error = await response.json()
                return rejectWithValue(error.message || 'Не удалось создать тренировку')
            }

            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Произошла неизвестная ошибка')
        }
    }
)
