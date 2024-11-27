import { INewWorkout } from './../../ConfiguredWorkoutList/redux/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IWorkoutListSlice {
    workouts: INewWorkout[]
}

const workoutsList: IWorkoutListSlice = {
    workouts: [],
}

export const workoutsListSlice = createSlice({
    name: 'workoutsList',
    initialState: workoutsList,
    reducers: {
        addWorkout: (state, {payload}: PayloadAction<INewWorkout>) => {
            state.workouts.push(payload)
        },
        delWorkout: (state, {payload}: PayloadAction<number>) => {
            state.workouts = state.workouts.filter((workout)=> workout.id !== payload )
        },

    },
})

export const {
    addWorkout, delWorkout
} = workoutsListSlice.actions

export default workoutsListSlice.reducer
