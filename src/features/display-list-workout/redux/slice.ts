import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IExercise } from '../../create-workout/redux/slice'

export interface INewWorkout {
    id: any
    type: any
    date: string | null
    intensity: null | string
    exercises: IExercise[]
}

interface IDisplayListWorkoutInitialState {
    workouts: INewWorkout[]
}

const displayListWorkoutInitialState: IDisplayListWorkoutInitialState = {
    workouts: [],
}

export const displayListWorkoutSlice = createSlice({
    name: 'displayListWorkout',
    initialState: displayListWorkoutInitialState,
    reducers: {
        addWorkout: (state, { payload }: PayloadAction<INewWorkout>) => {
            state.workouts.push(payload)
        },
        delWorkout: (state, { payload }: PayloadAction<number>) => {
            state.workouts = state.workouts.filter(workout => workout.id !== payload)
        },
        updateWorkout: (state, { payload }: PayloadAction<INewWorkout>) => {
            const workoutIndex = state.workouts.findIndex(workout => workout.id === payload.id)
            if (workoutIndex !== -1) {
                state.workouts[workoutIndex] = payload
            }
        },
    },
})

export const { addWorkout, delWorkout, updateWorkout } = displayListWorkoutSlice.actions

export default displayListWorkoutSlice.reducer
