import React from 'react'

import { MyButton } from '../UI/button/MyButton'

import styles from './ExercisesListItem.module.scss'
import { useAppDispatch } from '../../shared/Redux/store'
import { setAddExerciseConfigureList } from '../ConfiguredWorkoutList/redux/slice'
import exercisesList, { exercisesListItem } from '../../data/DB'


interface ExercisesListItemProps {
  name: string,
  id: number,
  exercise: exercisesListItem
}

export const ExercisesListItem: React.FC<ExercisesListItemProps> = ({ name, exercise }) => {

  const dispatch = useAppDispatch()



  const handleClick = (exis: exercisesListItem) =>{
    dispatch(setAddExerciseConfigureList(exis));

  }
  return (
    <div className={styles.exercise}>
      <h3>{name}</h3>
      <MyButton onClick={()=>handleClick(exercise)}>Добавить</MyButton>
    </div>
  )
}
