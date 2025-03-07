import { useEffect } from 'react'


import { ExercisesItem } from '../exercises-list/components/exercises-item/index'

import { useAppSelector } from '../../../../shared/Redux/hooks'
import { useAppDispatch } from '../../../../shared/Redux/store'

import { getExercisesListItemsAPI } from '../../redux/thunks'
import { MyButton } from '../../../UI/button/MyButton'
import { MyModal } from '../../../UI/modal/MyModal'
import { toggleModal } from '../../redux/slice'
import { EditExerciseToBaseModal } from './components/modal-edit-exercise-to-base'
import { AddExerciseToBaseModal } from './components/modal-add-exercise-to-base'

import styles from './index.module.scss'

export const ExercisesList = () => {

  const dispatch = useAppDispatch()

  const { dataExercisesList, error } = useAppSelector(state => state.createWorkout)

  const {addExerciseToBase, editExerciseToBase} = useAppSelector((state)=> state.createWorkout.modal)

  const handlerCloseAddModal = () => {
    dispatch(toggleModal({modal:'addExerciseToBase', value: false}))
  }
  const handlerCloseEditModal = () => {
    dispatch(toggleModal({modal:'editExerciseToBase', value: false}))
  }

  const handleAddExerciseToBase = () => {
    dispatch(toggleModal({modal:'addExerciseToBase', value: true}))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getExercisesListItemsAPI()).unwrap()
        console.log('Получены все упражнения на странице создания тренировке:', data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Ошибка при загрузке  на странице создания тренировке:', err.message);
        } else {
          console.error('Неизвестная ошибка  на странице создания тренировке:', err);
        }
      }
    };
    fetchData();
  }, [dispatch])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Список упражнений</h2>
        <MyButton onClick={() => handleAddExerciseToBase()}>Добавить упражнение в базу</MyButton>
      </div>
      {error && <div className={styles.error}>Ошибка: {error}</div>}
      {dataExercisesList.map((exercise) =>
        <ExercisesItem key={exercise.uuid} exercise={exercise} />
      )}
      <MyModal onClose={()=> handlerCloseAddModal()} isOpen={addExerciseToBase}>
        <AddExerciseToBaseModal/>
      </MyModal>
      <MyModal onClose={()=> handlerCloseEditModal()} isOpen={editExerciseToBase}>
        <EditExerciseToBaseModal/>
      </MyModal>
    </div>
  )
}
