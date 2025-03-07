import React from 'react'
import Select from 'rc-select'
import 'rc-select/assets/index.css';

import { MyButton } from '../../../../../UI/button/MyButton'
import { useAppDispatch } from '../../../../../../shared/Redux/store'
import { delExerciseFromWorkout, setWorkoutToCreate } from '../../../../redux/slice'

import styles from './index.module.scss'
import { useAppSelector } from '../../../../../../shared/Redux/hooks';
import { IWorkoutExercise } from '../../../../redux/types';

interface CreateItemProps {
  exercise: IWorkoutExercise
  index: number
}

export const CreateItem: React.FC<CreateItemProps> = ({ exercise }) => {
  console.log('exer', exercise);

  const dispatch = useAppDispatch()

  // const { dataExercisesList } = useAppSelector(state => state.createWorkout)

  // const foundExercise = dataExercisesList.find(el => el.uuid === exercise.exercise_uuid)
  // const foundExercise = (uuid: string) => {
  //   return dataExercisesList.find((el) => uuid === el.uuid)
  // }

  // const foundExerciseData = foundExercise(exercise.exercise_uuid)

  const handleChangeSets = (value: number) => {
    dispatch(setWorkoutToCreate({ id: exercise.exercise_uuid, key: 'sets', value }));
  };

  const handleChangeReps = (value: number) => {
    dispatch(setWorkoutToCreate({ id: exercise.exercise_uuid, key: 'reps', value }))

  };

  const handleChangeWeight = (value: number) => {
    dispatch(setWorkoutToCreate({ id: exercise.exercise_uuid, key: 'weight', value }))
  };

  const numbersSets = Array.from({ length: 20 }, (_, idx) => idx + 1);
  const numbersQuantity = Array.from({ length: 200 }, (_, idx) => idx + 1);
  const numbersWeight = Array.from({ length: 400 }, (_, idx) => idx + 1);

  const handleDeleteExercise = (uuid: string) => {
    dispatch(delExerciseFromWorkout(uuid))
  }

  return (
    <div className={styles.wrapper}>
      <h3>{exercise.name}</h3>
      <div>
        <h4>Количество подходов</h4>
        <Select
          value={exercise.sets}
          onChange={handleChangeSets}
          placeholder="Подходов"
          showSearch
        >
          {numbersSets.map((num) => (
            <Select.Option key={num} value={num}>
              {num}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div>
        <h4>Количество повторений</h4>
        <Select
          value={exercise.reps}
          onChange={handleChangeReps}
          placeholder="Раз"
          showSearch
        >
          {numbersQuantity.map((num) => (<Select.Option key={num} value={num}>
            {num}
          </Select.Option>)
          )}
        </Select>
      </div>
      {exercise.isWeight && <div>
        <h4>Вес</h4>
        <Select
          value={exercise.weight}
          onChange={handleChangeWeight}
          placeholder="Кг"
          showSearch
        >
          {numbersWeight.map((num) => (<Select.Option key={num} value={num}>
            {num}
          </Select.Option>)

          )}
        </Select>
      </div>}
      <MyButton onClick={() => handleDeleteExercise(exercise.exercise_uuid)}>Удалить</MyButton>
    </div>
  )
}
