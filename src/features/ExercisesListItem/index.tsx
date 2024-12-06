import React from 'react'

import { MyButton } from '../UI/button/MyButton'

import styles from './ExercisesListItem.module.scss'
import { useAppDispatch } from '../../shared/Redux/store'
import { exercisesListItem } from '../../data/DB'
import { addNewExerciseForm } from '../ConfiguredWorkoutList/redux/slice'


interface ExercisesListItemProps {
  name: string,
  id: number,
  exercise: exercisesListItem
}

export const ExercisesListItem: React.FC<ExercisesListItemProps> = ({ name, exercise }) => {

  const dispatch = useAppDispatch()

  const handleClick = (exis: exercisesListItem) => {
    dispatch(addNewExerciseForm({
      id: exis.id,
      name: exis.name,
      sets: 0,
      reps: 0,
      weight: 0
    }));

  }
  return (
    <div className={styles.exercise}>
      <h3>{name}</h3>
      <MyButton onClick={() => handleClick(exercise)}>Добавить</MyButton>
    </div>
  )
}
