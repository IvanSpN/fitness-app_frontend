import { IExercisesListItemFromAPI } from '../../create-workout/redux/types'

export interface IAddExersice {
    uuid: string
    name: string
    sets: number
    reps: number
    weight?: number
    extraWeight?: number
    checked: boolean
}
export type IAddExersiceWithChecked = Omit<IExercisesListItemFromAPI, 'type'> & {
    checked: boolean
}
