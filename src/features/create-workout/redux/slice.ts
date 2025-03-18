import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { addExerciseToBaseAPI, getExercisesListItemsAPI, removeExerciseToBaseAPI, updateExercise } from './thunks'
import { Exercises, ICreateWorkoutInitialState, Workouts,} from './types'

const createWorkoutInitialState: ICreateWorkoutInitialState = {
    dataExercisesList: [],
    workout: {
        type: 'силовая',
        date: null,
        intensity: 'легкая',
        exercises: [],
        isSkip: false,
    },
    modal: {
        addExerciseToBase: false,
        editExerciseToBase: false,
    },
    dateCreateWorkout: null,
    isLoading: false,
    error: null,
    selectedExerciseUuid: null,
}

export const createWorkoutSlice = createSlice({
    name: 'createWorkout',
    initialState: createWorkoutInitialState,
    reducers: {
        // setAddExersiceToBase: (state, { payload }: PayloadAction<IExercisesListItemAPI>) => {
        //     state.dataExercisesList.push(payload)
        // },
        setSelectedExerciseUuid: (state, { payload }) => {
            state.selectedExerciseUuid = payload
        },
        delExerciseFromWorkout: (state, { payload }: PayloadAction<string>) => {
            state.workout.exercises = state.workout.exercises.filter(
                (exercise) => exercise.exercise_uuid !== payload
            );
        },


        // setUpdateExercise: (
        //     state,
        //     { payload }: PayloadAction<{ uuid: string; name: string; isWeight: boolean; type: string }>
        // ) => {
        //     const indexExercise = state.dataExercisesList.findIndex(exercise => exercise.uuid === payload.uuid)
        //     if (indexExercise !== -1) {
        //         state.dataExercisesList[indexExercise] = payload
        //     }
        // },
        setWorkoutToCreate: (state, { payload }: PayloadAction<{ id: string; key: keyof Exercises.Types.WorkoutExercise; value: number }>) => {
            const exercise = state.workout.exercises.find(exercise => exercise.exercise_uuid === payload.id)
            if (exercise)
                state.workout.exercises = state.workout.exercises.map(exercise =>
                    exercise.exercise_uuid === payload.id ? { ...exercise, [payload.key]: payload.value } : exercise
                )
        },
        setIntensity: (state, { payload }: PayloadAction<Workouts.Types.Workout['intensity']>) => {
            state.workout.intensity = payload
        },
        setType: (state, { payload }: PayloadAction<Workouts.Types.Workout['type']>) => {
            state.workout.type = payload
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
        submitForm: state => {
            state.workout.exercises = []
        },
        addExerciseToWorkout: (state, { payload }: PayloadAction<Exercises.Types.WorkoutExercise>) => {
            state.workout.exercises.push(payload)
        },


        setDate: (state, { payload }: PayloadAction<ICreateWorkoutInitialState['dateCreateWorkout']>) => {
            state.dateCreateWorkout = payload
            state.workout.date = payload
        },
        deleteDate: state => {
            state.dateCreateWorkout = null
        },
        toggleModal: (
            state,
            { payload }: PayloadAction<{ modal: keyof ICreateWorkoutInitialState['modal']; value: boolean }>
        ) => {
            state.modal[payload.modal] = payload.value
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getExercisesListItemsAPI.pending, (state: ICreateWorkoutInitialState) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getExercisesListItemsAPI.fulfilled, (state: ICreateWorkoutInitialState, { payload }) => {
                state.dataExercisesList = payload
                state.isLoading = false
            })
            .addCase(getExercisesListItemsAPI.rejected, (state: ICreateWorkoutInitialState, { payload }) => {
                console.error('Ошибка (слайс) на бэке:', payload)
                state.isLoading = false
                state.error = payload as string
            })
            .addCase(addExerciseToBaseAPI.pending, (state: ICreateWorkoutInitialState) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addExerciseToBaseAPI.fulfilled, (state: ICreateWorkoutInitialState, { payload }) => {
                state.dataExercisesList.push(payload)
                state.isLoading = false
            })
            .addCase(addExerciseToBaseAPI.rejected, (state: ICreateWorkoutInitialState, { payload }) => {
                console.error('Ошибка (слайс) на бэке:', payload)
                state.isLoading = false
                state.error = payload as string
            })
            .addCase(removeExerciseToBaseAPI.pending, (state: ICreateWorkoutInitialState) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(removeExerciseToBaseAPI.fulfilled, (state: ICreateWorkoutInitialState, { payload }) => {
                state.dataExercisesList = state.dataExercisesList.filter(exercise => exercise.uuid !== payload)
                state.isLoading = false
            })
            .addCase(removeExerciseToBaseAPI.rejected, (state: ICreateWorkoutInitialState, { payload }) => {
                console.error('Ошибка (слайс) на бэке:', payload)
                state.isLoading = false
                state.error = payload as string
            })
            .addCase(updateExercise.pending, (state: ICreateWorkoutInitialState) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(updateExercise.fulfilled, (state: ICreateWorkoutInitialState, { payload }) => {
                state.dataExercisesList = state.dataExercisesList.map(exercise =>
                    exercise.uuid === payload.uuid ? { ...exercise, ...payload } : exercise
                )
            })
            .addCase(updateExercise.rejected, (state: ICreateWorkoutInitialState, { payload }) => {
                console.error('Ошибка (слайс) на бэке:', payload)
                state.isLoading = false
                state.error = payload as string
            })
    },
})

export const {
    setSelectedExerciseUuid,
    setWorkoutToCreate,
    submitForm,
    addExerciseToWorkout,
    setDate,
    deleteDate,
    setIntensity,
    setType,
    setIsLoading,
    toggleModal,
    delExerciseFromWorkout
} = createWorkoutSlice.actions

export default createWorkoutSlice.reducer
