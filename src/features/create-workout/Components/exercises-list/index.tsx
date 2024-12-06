import React, { useEffect } from 'react'

import exercisesList from '../../../../data/DB'

import { ExercisesItem } from '../exercises-list/components/exercises-item/index'

import { useAppSelector } from '../../../../shared/Redux/hooks'
import { useAppDispatch } from '../../../../shared/Redux/store'
import { setExercisesList } from '../../redux/slice'

import styles from './index.module.scss'

export const ExercisesList = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setExercisesList(exercisesList))
  }, [])

  const { dataExercisesList } = useAppSelector(state => state.createWorkout)

  return (
    <div className={styles.wrapper}>
      <h2>Список упражнений</h2>
      {dataExercisesList.map((exercise) =>
        <ExercisesItem name={exercise.name} key={exercise.id} id={exercise.id} exercise={exercise} />
      )}
    </div>
  )
}
