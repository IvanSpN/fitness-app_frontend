import { DisplayListWorkout } from '../features/display-list-workout'
import { EditWorkout } from '../features/edit-workout'

import '../styles/_workouts.scss'

export const Workouts = () => {
    return (
        <div className="workouts-wrapper">
            <DisplayListWorkout />
            <EditWorkout />
        </div>
    )
}
