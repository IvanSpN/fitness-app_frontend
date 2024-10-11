import { useState } from 'react'
import { ExercisesList } from '../components/ExercisesList'
import '../styles/index.scss'
import { ConfiguredWorkoutList } from '../components/ConfiguredWorkoutList/ConfiguredWorkoutList'

export const Constructor = () => {
const [scnf, setScnf] = useState<[]>([])

    return (
        <div className='constructor'>
            <div className='www'>

                <div className='left-block'>
                    <h2>Список упражнений</h2>
                    <ExercisesList />
                </div>
                <div className='right-block'>
                    <h2>Собраная тренировка</h2>
                    <ConfiguredWorkoutList/>
                </div>

            </div>
        </div>
    )
}
