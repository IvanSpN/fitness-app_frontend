import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { exercisesListItem } from '../../../data/DB'

export interface IExercise {
    id: number
    name: string
    sets: number
    reps: number
    weight?: number
    checked?: boolean
}

export interface INewWorkout {
    id: any,
    type: any,
    date: string | null
    exercises: IExercise[],
}

interface ICreateWorkoutInitialState {
    dataExercisesList: exercisesListItem[],
    configuredWorkoutList: [],
    formList: IExercise[],
    workout: INewWorkout,
    dateCreateWorkout: string | null,
}

const createWorkoutInitialState: ICreateWorkoutInitialState = {
    dataExercisesList: [],
    configuredWorkoutList: [],
    formList: [],
    workout: {
        type: null,
        id: null,
        date: null,
        exercises: [],
    },
    dateCreateWorkout: null,
}

export const createWorkoutSlice = createSlice({
    name: 'createWorkout',
    initialState: createWorkoutInitialState,
    reducers: {
        setExercisesList: (state, action: PayloadAction<exercisesListItem[]>) => {
            state.dataExercisesList = action.payload
        },
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
        setDate: ((state, { payload }: PayloadAction<ICreateWorkoutInitialState['dateCreateWorkout']>) => {
            state.dateCreateWorkout = payload
        }),
        deleteDate: ((state) => {
            state.dateCreateWorkout = null
        }),

    },
})

export const {
    setExercisesList, setWorkOutForm, submitForm, addNewExerciseForm, deleteNewExerciseForm, deleteAllFormList, setDate, deleteDate,
} = createWorkoutSlice.actions

export default createWorkoutSlice.reducer
