
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { exercisesListItem } from '../../../data/DB'


interface IExercisesListSliceState {
    dataExercisesList: exercisesListItem [] ,
    configuredWorkoutList: [],
    isLoading: boolean,


}

const exercisesList: IExercisesListSliceState = {
    dataExercisesList: [],
    configuredWorkoutList: [],
    isLoading: false,
}

export const exercisesListSlice = createSlice({
    name: 'exercisesList',
    initialState: exercisesList,
    reducers: {
        setExercisesList: (state, action: PayloadAction<exercisesListItem[]>)=>{
                state.dataExercisesList = action.payload
        },

    },
})

export const {
    setExercisesList,

} = exercisesListSlice.actions

export default exercisesListSlice.reducer
