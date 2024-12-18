import { DisplayListWorkout } from '../features/display-list-workout'
import { EditWorkout } from '../features/edit-workout'

import '../styles/index.scss'

export const Workouts = () => {
    return (
        <div className="wrapper">
            <DisplayListWorkout />
            <EditWorkout />
        </div>
    )
}
