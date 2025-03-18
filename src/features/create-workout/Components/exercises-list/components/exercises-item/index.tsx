import React, { useEffect } from 'react'

import { MyButton } from '../../../../../UI/button/MyButton'

import { useAppDispatch } from '../../../../../../shared/Redux/store'
import { addExerciseToWorkout, setSelectedExerciseUuid, toggleModal } from '../../../../redux/slice'

import { Exercises, } from '../../../../redux/types'

import styles from './index.module.scss'
import { removeExerciseToBaseAPI } from '../../../../redux/thunks'
interface ExercisesItemProps {
  exercise: Exercises.Response.Item
}

export const ExercisesItem: React.FC<ExercisesItemProps> = ({ exercise }) => {

  const dispatch = useAppDispatch()

  const handleAddExerciseToWorkout = () => {

    const newWorkoutExercise: Exercises.Types.WorkoutExercise = {
      exercise_uuid: exercise.uuid,
      name: exercise.name,
      reps: 0,
      sets: 0,
      weight: 0,
      isWeight: exercise.isWeight
    }
    dispatch(addExerciseToWorkout(newWorkoutExercise));
  }

  const handleDelExerciseFromBase = async () => {
    try {
      const deletedExercise = await dispatch(removeExerciseToBaseAPI(exercise.uuid)).unwrap();
      console.log('Удалено упражнение:', deletedExercise);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }

  }

  const handleEditExerciseToBase = () => {
    dispatch(setSelectedExerciseUuid(exercise.uuid))
    dispatch(toggleModal({ modal: 'editExerciseToBase', value: true }))
  }

  return (
    <div className={styles.exercise}>
      <h3>{exercise.name}</h3>
      <MyButton onClick={() => handleAddExerciseToWorkout()}>Добавить упражнение в тренировку</MyButton>
      <MyButton onClick={() => handleDelExerciseFromBase()}>Удалить упражнение из базы</MyButton>
      <MyButton onClick={() => handleEditExerciseToBase()}>Редактировать упражнение</MyButton>
    </div>
  )
}
