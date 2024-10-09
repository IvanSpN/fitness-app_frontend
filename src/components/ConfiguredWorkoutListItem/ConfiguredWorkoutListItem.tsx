import React from 'react'

import styles from './ConfiguredWorkoutListItem.module.scss'
import { MyButton } from '../UI/button/MyButton'

interface ConfiguredWorkoutListItemProps {
    name: string,
}

export const ConfiguredWorkoutListItem: React.FC<ConfiguredWorkoutListItemProps> = ({name}) => {
  return (
    <div className={styles.configuredWorkout}>
    <h3>{name}</h3>
    <MyButton>Удалить</MyButton>
  </div>
  )
}
