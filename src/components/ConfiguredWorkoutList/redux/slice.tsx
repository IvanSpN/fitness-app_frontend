
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import exercisesList, { exercisesListItem } from '../../../data/DB'

interface IConfiguredWorkoutList {
    dataConfiguredWorkoutList: exercisesListItem  [],
    isLoading: boolean,
}

 const configuredWorkoutList: IConfiguredWorkoutList = {
    dataConfiguredWorkoutList: [],
    isLoading: false,
}

export const configuredWorkoutListSlice = createSlice({
    name: 'configuredWorkoutList',
    initialState: configuredWorkoutList,
    reducers: {
        setAddExerciseConfigureList: (state, action: PayloadAction<exercisesListItem>)=>{
                state.dataConfiguredWorkoutList.push(action.payload)
        },
        setDeleteExerciseConfiguredList: (state, action: PayloadAction<number>)=>{
                state.dataConfiguredWorkoutList = state.dataConfiguredWorkoutList.filter((exercise, index)=> index !== action.payload)
        },

    },
})

export const {
    setAddExerciseConfigureList,
    setDeleteExerciseConfiguredList

} = configuredWorkoutListSlice.actions

export default configuredWorkoutListSlice.reducer
