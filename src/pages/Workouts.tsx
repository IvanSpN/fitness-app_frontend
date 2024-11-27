import { useAppSelector } from '../shared/Redux/hooks'
import { СonfiguredWorkout } from '../components/СonfiguredWorkout/index'

import '../styles/index.scss'
import { WorkoutsList } from '../components/WorkoutsList'

export const Workouts = () => {

    const workouts = useAppSelector(state => state.configuredWorkoutList.workout)
    const { dateState } = useAppSelector(state => state.dataSetup)

    return (
        <div className="workouts">
<WorkoutsList/>
       </div>
    )
}
