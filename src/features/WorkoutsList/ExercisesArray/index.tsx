import React from 'react'
import styles from './ExercisesArray.module.scss'
import { IExercise } from '../../ConfiguredWorkoutList/redux/slice'
import { Exercise } from '../Exercise';

interface ExercisesArrayProps {
    exercises: IExercise [],
}

export const ExercisesArray: React.FC<ExercisesArrayProps> = ({exercises}) => {


  return (
    <div className={styles.wrapper}>
{exercises.map((exercise)=> <Exercise key={exercise.id} id={exercise.id} name={exercise.name} sets={exercise.sets} reps={exercise.reps} weight={exercise.weight} />)}
    </div>
  )
}

