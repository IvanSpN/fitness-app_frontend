import React from 'react'

import { ConfiguredWorkoutListItem } from '../ConfiguredWorkoutListItem'

import { useAppSelector } from '../../shared/Redux/hooks'
import { useAppDispatch } from '../../shared/Redux/store'

import { MyButton } from '../UI/button/MyButton'

import { deleteAllFormList, submitForm } from './redux/slice'
import { DataSetup } from '../DataSetup'
import { deleteDate, setDate } from '../DataSetup/redux/slice'
import { addWorkout } from '../WorkoutsList/redux/slice'

import styles from './ConfiguredWorkoutList.module.scss'

export const ConfiguredWorkoutList = () => {

    const dispatch = useAppDispatch()

    const { formList, workout } = useAppSelector(state => state.configuredWorkoutList)
    const { dateState } = useAppSelector(state => state.dataSetup)

    const onCreate = () => {
        const newWorkout = {
            ...workout,
            id: Date.now(),
            date: dateState,
            exercises: [...formList]
        }
        dispatch(addWorkout(newWorkout))
        dispatch(submitForm())
        dispatch(setDate(null))

    }


    const handlerDeleteAll = () => {
        dispatch(deleteAllFormList())
        dispatch(deleteDate())
    }

    return (
        <div>
            <div className={styles.top}>
                <DataSetup />
                {formList.length > 0 && <MyButton className={styles.btn_dellAll} onClick={handlerDeleteAll}>Удалить всё</MyButton>
                }
            </div>
            <div className={styles.configured_wrapper}>
                {formList.map((exercise, index) =>
                    <ConfiguredWorkoutListItem exercise={exercise} key={exercise.id} index={index} />
                )}
            </div>
            {formList.length > 0 && <MyButton className={styles.button_ok} onClick={onCreate}>Готово!</MyButton>
            }
        </div>
    )
}
