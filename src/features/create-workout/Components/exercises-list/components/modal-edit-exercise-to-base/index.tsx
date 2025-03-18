import { useEffect, useState } from 'react'
import Select from 'rc-select'

import { useAppDispatch } from '../../../../../../shared/Redux/store'
import { useAppSelector } from '../../../../../../shared/Redux/hooks'
import { toggleModal } from '../../../../redux/slice'
import { MyInput, TInputValue } from '../../../../../UI/input/MyInput'
import { MyButton } from '../../../../../UI/button/MyButton'

import styles from './index.module.scss'
import { updateExercise } from '../../../../redux/thunks'
import { Exercises } from '../../../../redux/types'

export const EditExerciseToBaseModal = () => {

  const dispatch = useAppDispatch()

  const { selectedExerciseUuid } = useAppSelector((state) => state.createWorkout)
  const foundExersice = useAppSelector((state) => state.createWorkout.dataExercisesList.find((exercise) => exercise.uuid === selectedExerciseUuid))

  const [exerciseName, setExerciseName] = useState(foundExersice?.name)
  const [isWeight, setIsWeight] = useState(foundExersice?.isWeight)
  const [type, setType] = useState(foundExersice?.type)

  const optionsType = ['силовая', 'беговая', 'с собственным весом', 'круговая']

  const handlerChangeInput = (value: TInputValue) => {
    setExerciseName(value as string)
  }
  const handleChangeType = (value: string) => {
    setType(value)
  }
  const handlerChangeCheckbox = () => {
    setIsWeight((prev) => !prev)
  }

  const handlerEditExerciseToBase = () => {
    if (!foundExersice || !foundExersice.uuid) return;

    dispatch(toggleModal({ modal: 'editExerciseToBase', value: false }));

    const updateExerciseData: Exercises.Dto.Update = {
      name: exerciseName || '',
      isWeight: isWeight ?? false,
      type: type || 'силовая',
    }
    dispatch(updateExercise({ uuid: foundExersice?.uuid, updateExercise: updateExerciseData }))

  }


  useEffect(() => {
    setExerciseName(foundExersice?.name ?? '');
    setIsWeight(foundExersice?.isWeight ?? false);
    setType(foundExersice?.type ?? '');
  }, [foundExersice]);

  return (
    <div>
      <h2>Редактирование упражнения</h2>
      <hr />
      <div className={styles.wrapperInput}>
        <MyInput type='text' onChange={handlerChangeInput} label='Название упражнения' value={exerciseName ?? ''} />
        <MyInput type='checkbox' onChange={handlerChangeCheckbox} label='С дополнительным отягощением' value={isWeight} />
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
      <MyButton onClick={() => handlerEditExerciseToBase()}>Сохранить</MyButton>
      <MyButton onClick={() => { dispatch(toggleModal({ modal: 'editExerciseToBase', value: false })) }}>Отмена</MyButton>
    </div>
  )
}
