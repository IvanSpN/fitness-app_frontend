import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { exercisesListItem } from '../../../data/DB' // почему при удалении этой строки TS ругается?

export interface IExercise {
    id: number
    name: string
    sets: number
    reps: number
    weight: number
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
    workouts: INewWorkout[],
    dateCreateWorkout: string | null,
    dataSetup: null
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
    workouts: [],
    dateCreateWorkout: null,
    dataSetup: null
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
        addWorkout: (state, { payload }: PayloadAction<INewWorkout>) => {
            state.workouts.push(payload)
        },
        delWorkout: (state, { payload }: PayloadAction<number>) => {
            state.workouts = state.workouts.filter((workout) => workout.id !== payload)
        },
        setDate: ((state, { payload }: PayloadAction<string | null>) => {
            state.dateCreateWorkout = payload
        }),
        deleteDate: ((state) => {
            state.dateCreateWorkout = null
        }),

    },
})

export const {
    setExercisesList, setWorkOutForm, submitForm, addNewExerciseForm, deleteNewExerciseForm, deleteAllFormList, addWorkout, delWorkout, setDate, deleteDate,
} = createWorkoutSlice.actions

export default createWorkoutSlice.reducer
