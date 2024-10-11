import React from 'react'

import styles from './ConfiguredWorkoutListItem.module.scss'
import { MyButton } from '../UI/button/MyButton'
import { useAppDispatch } from '../../shared/Redux/store'
import { setDeleteExerciseConfiguredList } from '../ConfiguredWorkoutList/redux/slice'

interface ConfiguredWorkoutListItemProps {
  name: string,
  index: number
}

export const ConfiguredWorkoutListItem: React.FC<ConfiguredWorkoutListItemProps> = ({ name, index }) => {

  const dispatch = useAppDispatch()

  const handleDeleteExercise = (index: number) => {

    dispatch(setDeleteExerciseConfiguredList(index))
  }

  return (
    <div className={styles.configuredWorkout}>
      <h3>{name}</h3>
      <MyButton onClick={() => handleDeleteExercise(index)}>Удалить</MyButton>
    </div>
  )
}
