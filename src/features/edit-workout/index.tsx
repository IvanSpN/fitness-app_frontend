import React from 'react'

import { useAppSelector } from '../../shared/Redux/hooks'
import { useAppDispatch } from '../../shared/Redux/store'

import MyModal from '../UI/modal/MyModal'
import { EditWorkoutModal } from './Components/modal-edit-workout'

import { AddExerciseModal } from './Components/modal-add-exercise'

import { toggleModal } from './redux/slice'

import styles from './index.module.scss'

export const EditWorkout: React.FC = () => {

  const dispatch = useAppDispatch()

  const { modal } = useAppSelector(state => state.editWorkout)

  const handlerCloseModal = () => {
    dispatch(toggleModal({ modal: 'mainModalOpen', value: false }))
  }

  const handlerCloseAddExcersiseModal = () => {
    dispatch(toggleModal({ modal: 'addExcersiseOpen', value: false }))
  }
  return (
    <>
      <MyModal isOpen={modal.mainModalOpen} onClose={() => handlerCloseModal()}>
        <EditWorkoutModal />
      </MyModal>
      <MyModal isOpen={modal.addExcersiseOpen} onClose={() => handlerCloseAddExcersiseModal()}>
        <AddExerciseModal />
      </MyModal>
    </>
  )
}
