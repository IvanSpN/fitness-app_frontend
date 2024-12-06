import React, { useEffect } from 'react'

import { ExercisesListItem } from '../ExercisesListItem'

import exercisesList from '../../data/DB'

import { useAppSelector } from '../../shared/Redux/hooks'
import { useAppDispatch } from '../../shared/Redux/store'
import { setExercisesList } from './redux/slice'

import styles from './ExercisesList.module.scss'

export const ExercisesList = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setExercisesList(exercisesList))
  }, [])

  const { dataExercisesList } = useAppSelector(state => state.exercisesList)

  return (
    <div>
      {dataExercisesList.map((exercise) => {
        return <ExercisesListItem name={exercise.name} key={exercise.id} id={exercise.id} exercise={exercise}/>
      })}
    </div>
  )
}
