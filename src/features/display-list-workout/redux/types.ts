import { IWorkoutExercise } from "../../create-workout/redux/types"

export interface INewWorkout {
    uuid: string
    type: string | null
    date: string | null
    exercises: IWorkoutExercise[]
    intensity: string | null
    isSkip: boolean
    isDone: boolean
}

export interface IDisplayListWorkoutInitialState {
    workouts: INewWorkout[]
    error: null | string
    isLoading: boolean
}