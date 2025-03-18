import { Exercises } from '../../create-workout/redux/types'

export type IAddExersiceWithChecked = Omit<Exercises.Response.Item, 'type'> & {
    checked: boolean
}

