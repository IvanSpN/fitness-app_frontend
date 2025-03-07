export interface IExercisesListItemPushAPI {
    uuid: string
    name: string
    type: string
    isWeight: boolean
}
export interface IExercisesListItemFromAPI extends IExercisesListItemPushAPI {
    deletedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface IWorkoutExercise {
    exercise_uuid: string
    name: string
    sets: number
    reps: number
    isWeight: boolean
    weight?: number
    checked?: boolean
    exercise: IExercise
}

export interface IExercise {
    uuid: string;
  name: string;
}

export interface INewWorkout {
    type: string | null
    date: string | null
    intensity: null | string
    exercises: IWorkoutExercise[]
    isSkip: boolean
}

export interface ICreateWorkoutInitialState {
    dataExercisesList: IExercisesListItemFromAPI[]
    selectedExerciseUuid: string | null
    formList: IWorkoutExercise[]
    workout: INewWorkout
    dateCreateWorkout: string | null
    isLoading: boolean
    error: string | null
    modal: {
        addExerciseToBase: boolean
        editExerciseToBase: boolean
    }
}
