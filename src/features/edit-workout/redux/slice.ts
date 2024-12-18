import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INewWorkout, IExercise } from '../../create-workout/redux/slice'

export interface IEditWorkoutInitialState {
    dataExerciseListAdd: IAddExersice[]
    workout: INewWorkout | null
    mode: 'copy' | 'edit'
    modal: {
        mainModalOpen: boolean
        addExcersiseOpen: boolean
    }
}
export interface IAddExersice {
    id: number
    name: string
    sets: number
    reps: number
    weight?: number
    extraWeight?: number
    checked: boolean
}

const editWorkoutInitialState: IEditWorkoutInitialState = {
    dataExerciseListAdd: [],
    workout: null,
    mode: 'edit',
    modal: {
        mainModalOpen: false,
        addExcersiseOpen: false,
    },
}

export const editWorkoutSlice = createSlice({
    name: 'editWorkout',
    initialState: editWorkoutInitialState,
    reducers: {
        setExercisesListAdd: (state, { payload }: PayloadAction<IAddExersice[]>) => {
            state.dataExerciseListAdd = payload
        },
        setAddExercise: (state, { payload }: PayloadAction<IExercise[]>) => {
            if (state.workout?.exercises) {
                state.workout.exercises = state.workout.exercises.concat(payload)
            }
        },
        setEditWorkout: (state, { payload }: PayloadAction<INewWorkout>) => {
            state.workout = payload
        },
        setModalMode: (state, { payload }: PayloadAction<IEditWorkoutInitialState['mode']>) => {
            state.mode = payload
        },
        setIncrementField: (
            state,
            { payload }: PayloadAction<{ exerciseId: number; field: 'sets' | 'reps' | 'weight' }>
        ) => {
            const { exerciseId, field } = payload
            const foundExercise = state.workout?.exercises.find(exercise => exercise.id === exerciseId)
            if (foundExercise) {
                foundExercise[field] += 1
            }
        },
        setDecrementField: (
            state,
            { payload }: PayloadAction<{ exerciseId: number; field: 'sets' | 'reps' | 'weight' }>
        ) => {
            const { exerciseId, field } = payload
            const foundExercise = state.workout?.exercises.find(exercise => exercise.id === exerciseId)
            if (foundExercise) {
                foundExercise[field] -= 1
            }
        },
        setWorkoutDate: (state, { payload }: PayloadAction<string | null>) => {
            if (state.workout) {
                state.workout.date = payload
            }
        },
        setDelWorkout: (state, { payload }: PayloadAction<IExercise['id']>) => {
            if (state.workout) {
                state.workout.exercises = state.workout.exercises.filter(exercise => exercise.id !== payload)
            }
        },
        toggleModal: (
            state,
            { payload }: PayloadAction<{ modal: keyof IEditWorkoutInitialState['modal']; value: boolean }>
        ) => {
            state.modal[payload.modal] = payload.value
        },
        toggleChecked: (state, { payload }: PayloadAction<number>) => {
            const foundExercise = state.dataExerciseListAdd?.find(exercices => exercices.id === payload)
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
    setDelWorkout,
} = editWorkoutSlice.actions

export default editWorkoutSlice.reducer
