import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IExercise {
    id: number
    name: string
    sets: number
    reps: number
    weight: number
}
interface IConfiguredWorkoutList {
    formList: IExercise[]
    workout: INewWorkout
    isLoading: boolean,
}

export interface INewWorkout {
    id: any,
    type: any,
    date: string | null
    exercises: IExercise[],
}

const configuredWorkoutList: IConfiguredWorkoutList = {
    formList: [],
    workout: {
        type: null,
        id: null,
        date: null,
        exercises: [],
    },
    isLoading: false,
}

export const configuredWorkoutListSlice = createSlice({
    name: 'configuredWorkoutList',
    initialState: configuredWorkoutList,
    reducers: {

        setWorkOutForm: (state, { payload }: PayloadAction<{ id: number, key: keyof IExercise, value: number }>) => {
            const isExsist = state.formList.find((exc) => exc.id === payload.id)
            if (isExsist) state.formList = state.formList.map((exc) => exc.id === payload.id ? { ...exc, [payload.key]: payload.value } : exc)
        },
        submitForm: (state) => {
            state.formList = []
        },
        addNewExerciseForm: (state, { payload }: PayloadAction<IExercise>) => {
            state.formList.push(payload)
        },
        deleteNewExerciseForm: (state, { payload }: PayloadAction<number>) => {
            state.formList = state.formList.filter((workout) => workout.id !== payload)
        },
        deleteAllFormList: (state) => {
            state.formList = []
        },

    },
})

export const {
    setWorkOutForm,
    submitForm,
    addNewExerciseForm,
    deleteNewExerciseForm,
    deleteAllFormList,

} = configuredWorkoutListSlice.actions

export default configuredWorkoutListSlice.reducer
