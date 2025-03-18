import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { IDisplayListWorkoutInitialState } from './types'
import { deleteWorkoutAPI, fetchWorkoutsAPI, markSkipWorkoutAPI, rescheduleWorkoutAPI } from './thuks'
import { Workouts } from '../../create-workout/redux/types'

const displayListWorkoutInitialState: IDisplayListWorkoutInitialState = {
    workouts: [],
    error: null,
    isLoading: false,
}

export const displayListWorkoutSlice = createSlice({
    name: 'displayListWorkout',
    initialState: displayListWorkoutInitialState,
    reducers: {
        addWorkout: (state, { payload }: PayloadAction<Workouts.Response.Item>) => {
            state.workouts.push(payload)
        },
        delWorkout: (state, { payload }: PayloadAction<string>) => {
            state.workouts = state.workouts.filter(workout => workout.uuid !== payload)
        },
        updateWorkout: (state, { payload }: PayloadAction<Workouts.Response.Item>) => {
            const workoutIndex = state.workouts.findIndex(workout => workout.uuid === payload.uuid)
            if (workoutIndex !== -1) {
                state.workouts[workoutIndex] = payload
            }
        },
        // setToggleSkip: (state, { payload }: PayloadAction<string>) => {
        //     const foundWorkout = state.workouts.find(workout => workout.uuid === payload)
        //     if (foundWorkout) {
        //         foundWorkout.isSkip = !foundWorkout.isSkip
        //     }
        // },
        setRescheduleDate: (state, { payload }: PayloadAction<{ uuid: string; date: string | null }>) => {
            const workout = state.workouts.find(workout => workout.uuid === payload.uuid)
            if (workout) {
                workout.date = payload.date
            }
        },
        setRescheduleWorkouts: (state, { payload }: PayloadAction<{ uuid: string; date: string | null }>) => {
            const workouts = [...state.workouts]
            const skipWorkoutIndex = workouts.findIndex(workout => workout.uuid === payload.uuid)
            if (skipWorkoutIndex === -1) return

            const originalDate = dayjs(workouts[skipWorkoutIndex].date)
            const newDate = dayjs(payload.date)
            const daysDifference = newDate.diff(originalDate, 'day')

            workouts[skipWorkoutIndex].date = payload.date

            for (let i = skipWorkoutIndex + 1; i < workouts.length; i++) {
                const currentDate = dayjs(workouts[i].date)
                workouts[i].date = currentDate.add(daysDifference, 'day').format('YYYY-MM-DD')
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchWorkoutsAPI.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchWorkoutsAPI.fulfilled, (state, { payload }) => {
                state.workouts = payload
                state.isLoading = false
            })
            .addCase(fetchWorkoutsAPI.rejected, (state, { payload }) => {
                console.error('Ошибка (слайс) на бэке:', payload)
                state.isLoading = false
                state.error = payload as string
            })
            .addCase(deleteWorkoutAPI.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(deleteWorkoutAPI.fulfilled, (state, { payload }) => {
                state.workouts = state.workouts.filter(workout => workout.uuid !== payload)
                state.isLoading = false
            })
            .addCase(deleteWorkoutAPI.rejected, (state, { payload }) => {
                console.error('Ошибка (слайс) на бэке:', payload)
                state.isLoading = false
                state.error = payload as string
            })
            .addCase(markSkipWorkoutAPI.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(markSkipWorkoutAPI.fulfilled, (state, { payload }) => {
                state.workouts = state.workouts.map(workout =>
                    workout.uuid === payload ? { ...workout, isSkip: !workout.isSkip } : workout
                )
                state.isLoading = false
            })
            .addCase(markSkipWorkoutAPI.rejected, (state, { payload }) => {
                console.error('Ошибка (слайс) на бэке:', payload)
                state.isLoading = false
                state.error = payload as string
            })
            .addCase(rescheduleWorkoutAPI.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(
                rescheduleWorkoutAPI.fulfilled,
                (state, { payload }: PayloadAction<Workouts.Response.Item>) => {
                    const workout = state.workouts.find(workout => workout.uuid === payload.uuid)
                    if (workout) {
                        // workout.date = payload.date
                    } else {
                    }
                    state.isLoading = false
                }
            )
            .addCase(rescheduleWorkoutAPI.rejected, (state, { payload }) => {
                console.error('Ошибка (слайс) на бэке:', payload)
                state.isLoading = false
                state.error = payload as string
            })
    },
})

export const { addWorkout, delWorkout, updateWorkout, setRescheduleDate, setRescheduleWorkouts } =
    displayListWorkoutSlice.actions

export default displayListWorkoutSlice.reducer
