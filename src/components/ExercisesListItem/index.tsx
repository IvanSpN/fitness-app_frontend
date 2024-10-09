import React from 'react'

import { MyButton } from '../UI/button/MyButton'

import styles from './ExercisesListItem.module.scss'


interface ExercisesListItemProps {
  name: string,
}

export const ExercisesListItem: React.FC<ExercisesListItemProps> = ({ name }) => {
  return (
    <div className={styles.exercises}>
      <h3>{name}</h3>
      <MyButton>Добавить</MyButton>
    </div>
  )
}
