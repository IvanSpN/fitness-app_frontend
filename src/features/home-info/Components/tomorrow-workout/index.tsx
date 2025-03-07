import React, { useEffect } from 'react'

import styles from './index.module.scss'
import dayjs from 'dayjs'
import { useAppSelector } from '../../../../shared/Redux/hooks'
import { useAppDispatch } from '../../../../shared/Redux/store'
import { setTomorrowWorkout } from '../../redux/slice'

export const TomorrowWorkout = () => {

    const dispatch = useAppDispatch()

    const { tomorrowWorkout } = useAppSelector(state => state.homeInfo)

    const { workouts } = useAppSelector(state => state.displayListWorkout)

    const tomorrowDate = dayjs().add(1, 'day').format("DD.MM.YYYY")

    const foundTodayWorkout = (workouts: any, date: any) => {
        return workouts.find((workout: any) => dayjs(workout?.date).format("DD.MM.YYYY") === date)
    }

    const handlerSetTodayWorkout = () => {
        dispatch(setTomorrowWorkout(foundTodayWorkout(workouts, tomorrowDate)))
    }

    useEffect(() => {
        handlerSetTodayWorkout()
    }, [])

    return (
        <div className={styles.wrapper}>
            <div>Завтра {tomorrowDate}</div>
            <div className={styles.workout}>{tomorrowWorkout
                ? (
                    <div>
                        {tomorrowWorkout.type && <p>Тип: {tomorrowWorkout.type}</p>}
                        <p className={styles.intensity}>Интенсивность: {tomorrowWorkout.intensity}</p>
                        <div>
                            <p>Упражнения:</p>
                            <ul>
                                {tomorrowWorkout.exercises?.map((exercise: any, index: number) => (
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
