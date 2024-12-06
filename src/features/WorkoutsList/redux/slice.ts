import { INewWorkout } from './../../ConfiguredWorkoutList/redux/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IWorkoutListSlice {
    workouts: INewWorkout[]
}

const exercisesList: IWorkoutListSlice = {
    workouts: [],
}

export const exercisesListSlice = createSlice({
    name: 'exercisesList',
    initialState: exercisesList,
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
} = exercisesListSlice.actions

export default exercisesListSlice.reducer
