import React from 'react'
import styles from './EditWorkout.module.scss'
import { ExerciseModal } from '../ExerciseModal'

export const EditWorkout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p>Упражнение</p>
        <p>Количество подходов</p>
        <p>Количество повторов</p>
        <p>Вес</p>
      </div>
      <ExerciseModal />



    </div>
  )
}
