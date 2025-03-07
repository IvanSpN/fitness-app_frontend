import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { IDisplayListWorkoutInitialState, INewWorkout } from './types'
import { deleteWorkoutAPI, fetchWorkoutsAPI, markSkipWorkout } from './thuks'



const displayListWorkoutInitialState: IDisplayListWorkoutInitialState = {
    workouts: [],
    error: null,
    isLoading: false,
}

export const displayListWorkoutSlice = createSlice({
    name: 'displayListWorkout',
    initialState: displayListWorkoutInitialState,
    reducers: {
        addWorkout: (state, { payload }: PayloadAction<INewWorkout>) => {
            state.workouts.push(payload)
        },
        delWorkout: (state, { payload }: PayloadAction<string>) => {
            state.workouts = state.workouts.filter(workout => workout.uuid !== payload)
        },
        updateWorkout: (state, { payload }: PayloadAction<INewWorkout>) => {
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
                    state.workouts = state.workouts.filter((workout)=> workout.uuid !== payload )
                    state.isLoading = false
                })
                .addCase(deleteWorkoutAPI.rejected, (state, { payload }) => {
                    console.error('Ошибка (слайс) на бэке:', payload)
                    state.isLoading = false
                    state.error = payload as string
                })
                .addCase(markSkipWorkout.pending, state => {
                    state.isLoading = true
                    state.error = null
                })
                .addCase(markSkipWorkout.fulfilled, (state, { payload }) => {
                    state.workouts = state.workouts.map((workout) =>
                        workout.uuid === payload ? { ...workout, isSkip: !workout.isSkip } : workout
                    );
                    state.isLoading = false
                })
                .addCase(markSkipWorkout.rejected, (state, { payload }) => {
                    console.error('Ошибка (слайс) на бэке:', payload)
                    state.isLoading = false
                    state.error = payload as string
                })
        },
})

export const { addWorkout, delWorkout, updateWorkout, setRescheduleDate, setRescheduleWorkouts } =
    displayListWorkoutSlice.actions

export default displayListWorkoutSlice.reducer
