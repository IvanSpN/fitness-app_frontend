import React from 'react'
import Select from 'rc-select'
import 'rc-select/assets/index.css';

import { MyButton } from '../../../../../UI/button/MyButton'
import { useAppDispatch } from '../../../../../../shared/Redux/store'
import { deleteNewExerciseForm, IExercise, setWorkOutForm } from '../../../../redux/slice'

import styles from './index.module.scss'

interface CreateItemProps {
  exercise: IExercise
  index: number
}

export const CreateItem: React.FC<CreateItemProps> = ({ exercise }) => {

  const dispatch = useAppDispatch()


  const handleChangeSets = (value: number) => {
    dispatch(setWorkOutForm({ id: exercise.id, key: 'sets', value }));
  };

  const handleChangeReps = (value: number) => {
    dispatch(setWorkOutForm({ id: exercise.id, key: 'reps', value }))

  };

  const handleChangeWeight = (value: number) => {
    dispatch(setWorkOutForm({ id: exercise.id, key: 'weight', value }))
  };

  const numbersSets = Array.from({ length: 20 }, (_, idx) => idx + 1);
  const numbersQuantity = Array.from({ length: 200 }, (_, idx) => idx + 1);
  const numbersWeight = Array.from({ length: 400 }, (_, idx) => idx + 1);

  const handleDeleteExercise = (id: number) => {
    dispatch(deleteNewExerciseForm(id))
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
      <div>
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
      </div>
      <MyButton onClick={() => handleDeleteExercise(exercise.id)}>Удалить</MyButton>
    </div>
  )
}
