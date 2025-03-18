import axios from 'axios'
import { API_URL } from '../../../utils/constants'
import { ExercisesItem } from '../Components/exercises-list/components/exercises-item'

export interface ICreateWorkoutInitialState {
    dataExercisesList: Exercises.Response.Item[]
    selectedExerciseUuid: string | null
    workout: Workouts.Types.Workout
    dateCreateWorkout: string | null
    isLoading: boolean
    error: string | null
    modal: {
        addExerciseToBase: boolean
        editExerciseToBase: boolean
    }
}
export namespace Exercises {
    export namespace Types {
        export interface Exercise {
            uuid: string
            name: string
            isWeight: boolean
            type: string
        }

        export interface WorkoutExercise {
            exercise_uuid: string
            name: string
            reps: number
            sets: number
            weight?: number
            isWeight: boolean
        }

        export type ExerciseChecked = {
            uuid: string
            name: string
            isWeight: boolean
            checked: boolean
        }
        export interface PreparedExercise {
            exercise_uuid: string
            uuid: string
            name: string
            isWeight: boolean
            sets: number
            reps: number
            weight: number
            exercise: {
                name: string
            }
        }
    }
    export namespace Dto {
        export interface Create {
            uuid: string
            name: string
            isWeight: boolean
            type: string
        }
        export interface Update {
            name: string
            isWeight: boolean
            type: string
        }
    }

    export namespace Response {
        export interface Item extends Exercises.Types.Exercise {
            updatedAt: string
            createdAt: string
            deletedAt: string
        }
        export interface WorkoutExercise extends Exercises.Types.WorkoutExercise {
            exercise: { name: string }
        }

        export interface Update extends Exercises.Response.Item {}
    }
}

export namespace Workouts {
    let controller = 'workouts'
    export namespace Types {
        export interface Workout {
            type: string | null
            date: string | null
            intensity: null | string
            exercises: Exercises.Types.WorkoutExercise[]
            isSkip: boolean
        }
    }

    export namespace Dto {
        export interface Create {
            uuid: string
            user_uuid: string
            date: string | null
            type: string | null
            isSkip: boolean
            isDone: boolean
            intensity: null | string
            exercises: Exercises.Types.WorkoutExercise[]
        }
        export interface Update extends Create {
            updatedAt: string
            createdAt: string
            deletedAt: string
        }
        export interface RescheduleWorkout {
            uuid: string
            date: string
        }
        export interface RescheduleWorkoutWithShift {
            uuid: string
            days: number
        }
    }
    export namespace Response {
        export interface Item {
            createdAt: string
            date: string | null
            deletedAt: string
            uuid: string
            user_uuid: string
            type: string | null
            isSkip: boolean
            isDone: boolean
            intensity: null | string
            exercises: Exercises.Response.WorkoutExercise[]
            updatedAt: string
        }
    }

    export namespace Request {
        export const getList = async (): Promise<Response.Item[]> => {
            return (await axios.get(`${API_URL}/${controller}`)).data
        }
        export const update = async (dto: Dto.Update): Promise<Response.Item> => {
            return (await axios.patch(`${API_URL}/${controller}/${dto.uuid}`, dto)).data
        }
        export const reschedule = async (dto: Dto.RescheduleWorkout): Promise<Response.Item> => {
            return (await axios.patch(`${API_URL}/${controller}/${dto.uuid}/reschedule-workout/`, dto)).data
        }
        export const rescheduleWithShift = async (dto: Dto.RescheduleWorkoutWithShift): Promise<Response.Item> => {
            return (await axios.patch(`${API_URL}/${controller}/${dto.uuid}/reschedule-shift/`, dto)).data
        }
    }
}
