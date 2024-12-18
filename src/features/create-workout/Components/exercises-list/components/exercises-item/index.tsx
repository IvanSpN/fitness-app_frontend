import React from 'react'

import { MyButton } from '../../../../../UI/button/MyButton'

import { useAppDispatch } from '../../../../../../shared/Redux/store'
import { exercisesListItem } from '../../../../../../data/DB'
import { addNewExerciseForm } from '../../../../redux/slice'

import styles from './index.module.scss'

interface ExercisesItemProps {
  exercise: exercisesListItem
}

export const ExercisesItem: React.FC<ExercisesItemProps> = ({ exercise }) => {

  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(addNewExerciseForm({
      id: exercise.id,
      name: exercise.name,
      sets: exercise.config.sets,
      reps: exercise.config.reps,
      weight: exercise.config.weight,
    }));

  }
  return (
    <div className={styles.exercise}>
      <h3>{exercise.name}</h3>
      <MyButton onClick={() => handleClick()}>Добавить упражнение</MyButton>
    </div>
  )
}
