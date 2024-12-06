import { useAppSelector } from '../shared/Redux/hooks'
import { СonfiguredWorkout } from '../features/create-workout/index'

import '../styles/index.scss'
import { WorkoutsList } from '../features/WorkoutsList'

export const Workouts = () => {

    const workouts = useAppSelector(state => state.configuredWorkoutList.workout)
    const { dateState } = useAppSelector(state => state.dataSetup)

    return (
        <div className="workouts">
            <WorkoutsList />
        </div>
    )
}
