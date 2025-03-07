import React, { useEffect } from 'react'
import dayjs from 'dayjs'

import { useAppSelector } from '../../../../shared/Redux/hooks'
import { useAppDispatch } from '../../../../shared/Redux/store'
import { setTodayWorkout } from '../../redux/slice'

import styles from './index.module.scss'

interface TodayWorkoutProps {

}

export const TodayWorkout: React.FC<TodayWorkoutProps> = () => {

    const dispatch = useAppDispatch()

    const todayDate = dayjs().format("DD.MM.YYYY")

    const { todayWorkout } = useAppSelector(state => state.homeInfo)
    const { workouts } = useAppSelector(state => state.displayListWorkout)

    const foundTodayWorkout = (workouts: any, date: any) => {
        return workouts.find((workout: any) => dayjs(workout.date).format("DD.MM.YYYY") === date)
    }

    const handlerSetTodayWorkout = () => {
        dispatch(setTodayWorkout(foundTodayWorkout(workouts, todayDate)))
    }

    useEffect(() => {
        handlerSetTodayWorkout()
    }, [])

    return (
        <div className={styles.wrapper}>
            <div>Сегодня {todayDate}</div>
            <div className={styles.workout}>{todayWorkout
                ? (
                    <div>
                        {todayWorkout.type && <p>Тип: {todayWorkout.type}</p>}
                        <p className={styles.intensity}>Интенсивность: {todayWorkout.intensity}</p>
                        <div>
                            <p>Упражнения:</p>
                            <ul>
                                {todayWorkout.exercises.map((exercise: any, index: number) => (
                                    <li key={index} className={styles.exercises}>
                                        <p>{exercise.name}</p>
                                        <p>Повторы: {exercise.reps}</p>
                                        <p>Вес: {exercise.weight}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
                : 'Нет данных о тренировке, видимо выходной'}
            </div>
        </div>
    )
}
