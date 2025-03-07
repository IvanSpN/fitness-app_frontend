import React, { useEffect } from 'react'
import { TodayWorkout } from './Components/today-workout'
import { TomorrowWorkout } from './Components/tomorrow-workout'

import styles from './index.module.scss'
import { useAppDispatch } from '../../shared/Redux/store'
import { getExercisesListItemsAPI } from '../create-workout/redux/thunks'

export const HomeInfo = () => {

    const dispatch = useAppDispatch()

         useEffect(() => {
            const fetchData = async () => {
              try {
                const data = await dispatch(getExercisesListItemsAPI()).unwrap()
                console.log('Получены все упражнения:', data);
              } catch (err: unknown) {
                if (err instanceof Error) {
                  console.error('Ошибка при загрузке:', err.message);
                } else {
                  console.error('Неизвестная ошибка:', err);
                }
              }
            };
            fetchData();
          }, [dispatch])
    return (
        <div className={styles.wrapper}>
            <TodayWorkout />
            <TomorrowWorkout />
        </div>
    )
}
