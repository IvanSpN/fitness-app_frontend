import { ExercisesList } from '../features/ExercisesList'
import { CreateWorkout } from '../features/create-workout'

import '../styles/index.scss'

export const Constructor = () => {

    return (
        <div className='constructor'>
            <div className='www'>
                <CreateWorkout />

                {/* <div className='left-block'>
                    <h2>Список упражнений</h2>
                    <ExercisesList />
                </div>
                <div className='right-block'>
                    <h2>Собираем тренировку</h2>
                    <ConfiguredWorkoutList />
                </div> */}

            </div>
        </div>
    )
}
