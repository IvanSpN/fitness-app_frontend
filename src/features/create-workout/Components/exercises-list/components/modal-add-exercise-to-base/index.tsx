import React, { useState } from 'react'

import { v4 as uuidv4 } from "uuid";

import styles from './index.module.scss'
import Select from 'rc-select'
import { useAppDispatch } from '../../../../../../shared/Redux/store'
import { useAppSelector } from '../../../../../../shared/Redux/hooks'
import {  toggleModal } from '../../../../redux/slice'
import { MyButton } from '../../../../../UI/button/MyButton'
import { MyInput, TInputValue } from '../../../../../UI/input/MyInput'
import { addExerciseToBaseAPI } from '../../../../redux/thunks';


export const AddExerciseToBaseModal = () => {

  const dispatch = useAppDispatch()
  const optionsType = ['силовая', 'беговая', 'с собственным весом', 'круговая']

  const [exerciseName, setExerciseName] = useState<string>('')
  const [isWeigth, setIsWeigth] = useState<boolean>(false)
  const [type, setType] = useState(optionsType[0])

  const handlerChangeInputName = (value: TInputValue) => {
    setExerciseName(value as string)
  }
  const handlerChangeCheckboxIsWeigth = () => {
    setIsWeigth((prev) => !prev)
  }

  const handleChangeType = (value: string) => {
    setType(value)
  }
  const handlerAddExerciseToBase = () => {
    const newExercise = {
      uuid: uuidv4(),
      name: exerciseName,
      isWeight: isWeigth,
      type: type
    }
    dispatch(addExerciseToBaseAPI(newExercise)).unwrap()
    dispatch(toggleModal({ modal: 'addExerciseToBase', value: false }))
  }

  return (
    <div>
      <h2>Добавить упражнение в базу</h2>
      <hr />
      <div className={styles.wrapperInput}>
        <MyInput type='text' onChange={handlerChangeInputName} value={exerciseName} />
        <MyInput type='checkbox' onChange={handlerChangeCheckboxIsWeigth} value={isWeigth} />
        <label>
          <Select
            id="intensity-select"
            value={type}
            onChange={handleChangeType}
            showSearch
            getPopupContainer={triggerNode => triggerNode.parentNode}
            options={optionsType.map(option => ({ value: option, label: option }))}
          />
        </label>
      </div>
      <MyButton onClick={() => handlerAddExerciseToBase()}>Сохранить</MyButton>
      <MyButton onClick={() => dispatch(toggleModal({ modal: 'addExerciseToBase', value: false }))}>Отмена</MyButton>
    </div>
  )
}
