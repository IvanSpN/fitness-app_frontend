import { Workouts } from '../../create-workout/redux/types'
export interface IDisplayListWorkoutInitialState {
    workouts: Workouts.Response.Item[]
    error: null | string
    isLoading: boolean
}

// export interface INewWorkout {
//     uuid: string
//     type: string | null
//     date: string | null
//     exercises: IWorkout[]
//     intensity: string | null
//     isSkip: boolean
//     isDone: boolean
// }

