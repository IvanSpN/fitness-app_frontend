import React from 'react'

import styles from './ConfiguredWorkout.module.scss'
import { useAppSelector } from '../../shared/Redux/hooks'

export const СonfiguredWorkout: React.FC = () => {
    const { workout: workouts } = useAppSelector(state => state.configuredWorkoutList)

    return (
        <div className={styles.wrapper}>
            <div className={styles.date}>Тренировка на: </div>
            <div className={styles.list}>
                <p>Отжимание - 6 по 10</p>
                <p>Подтягивание - 5 по 10</p>
                <p>Приседание - 5 по 100</p>
                <p>Становая тяга - 6 по 10</p>
            </div>
        </div>
    )
}
