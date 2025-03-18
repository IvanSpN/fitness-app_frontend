import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Exercises, Workouts } from '../../create-workout/redux/types'

export interface IEditWorkoutInitialState {
    dataExerciseListAdd: Exercises.Types.ExerciseChecked[]
    workout: Workouts.Response.Item | null
    mode: 'copy' | 'edit'
    modal: {
        mainModalOpen: boolean
        addExcersiseOpen: boolean

    }
    stepCouter: string
}
const editWorkoutInitialState: IEditWorkoutInitialState = {
    dataExerciseListAdd: [],
    workout: null,
    mode: 'edit',
    modal: {
        mainModalOpen: false,
        addExcersiseOpen: false,
    },
    stepCouter: '1',
}

export const editWorkoutSlice = createSlice({
    name: 'editWorkout',
    initialState: editWorkoutInitialState,
    reducers: {
        setExercisesListAdd: (state, { payload }: PayloadAction<Exercises.Types.ExerciseChecked[]>) => {
            state.dataExerciseListAdd = payload
        },
        setAddExercise: (state, { payload }: PayloadAction<Exercises.Response.WorkoutExercise []>) => {
            if (state.workout?.exercises) {
                state.workout.exercises = state.workout.exercises.concat(payload)
            }
        },
        setEditWorkout: (state, { payload }: PayloadAction<Workouts.Response.Item>) => {
            state.workout = payload
        },
        setModalMode: (state, { payload }: PayloadAction<IEditWorkoutInitialState['mode']>) => {
            state.mode = payload
        },
        setIncrementField: (
            state,
            { payload }: PayloadAction<{ exerciseId: string; field: 'sets' | 'reps' | 'weight'; step: string }>
        ) => {
            const { exerciseId, field, step } = payload
            const foundExercise = state.workout?.exercises.find(exercise => exercise.exercise_uuid === exerciseId)
            if (foundExercise) {
                const stepValue = Number(step)
                foundExercise[field] += stepValue
            }
        },
        setDecrementField: (
            state,
            { payload }: PayloadAction<{ exerciseId: string; field: 'sets' | 'reps' | 'weight'; step: string }>
        ) => {
            const { exerciseId, field, step } = payload
            const foundExercise = state.workout?.exercises.find(exercise => exercise.exercise_uuid === exerciseId)
            if (foundExercise) {
                if (typeof foundExercise[field] === 'number') {
                    const stepValue = Number(step)
                    foundExercise[field] = Math.max(0, foundExercise[field] - stepValue)
                }
            }
        },
        setWorkoutDate: (state, { payload }: PayloadAction<string | null>) => {
            if (state.workout) {
                state.workout.date = payload
            }
        },
        setDelExercise: (state, { payload }: PayloadAction<Exercises.Types.WorkoutExercise['exercise_uuid']>) => {
            if (state.workout) {
                state.workout.exercises = state.workout.exercises.filter(exercise => exercise.exercise_uuid !== payload)
            }
        },
        setStepCounter: (state, { payload }: PayloadAction<string>) => {
            state.stepCouter = payload
        },
        setClearStepCounter: state => {
            state.stepCouter = ' '
        },
        setChangeIntensity: (state, { payload }: PayloadAction<Workouts.Types.Workout['intensity']>) => {
            if (state.workout) {
                state.workout.intensity = payload
            }
        },
        setChangeType: (state, { payload }: PayloadAction<Workouts.Types.Workout['type']>) => {
            if (state.workout) {
                state.workout.type = payload
            }
        },
        toggleModal: (
            state,
            { payload }: PayloadAction<{ modal: keyof IEditWorkoutInitialState['modal']; value: boolean }>
        ) => {
            state.modal[payload.modal] = payload.value
        },
        toggleChecked: (state, { payload }: PayloadAction<string>) => {
            const foundExercise = state.dataExerciseListAdd?.find(exercices => exercices.uuid === payload)
            if (foundExercise) {
                foundExercise.checked = !foundExercise.checked
            }
        },
    },
})

export const {
    setExercisesListAdd,
    setAddExercise,
    toggleModal,
    toggleChecked,
    setEditWorkout,
    setIncrementField,
    setDecrementField,
    setModalMode,
    setWorkoutDate,
    setDelExercise,
    setStepCounter,
    setClearStepCounter,
    setChangeIntensity,
    setChangeType,
} = editWorkoutSlice.actions

export default editWorkoutSlice.reducer
