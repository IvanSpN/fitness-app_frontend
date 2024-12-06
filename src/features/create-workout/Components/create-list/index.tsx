import React from 'react'

import { useAppSelector } from '../../../../shared/Redux/hooks'
import { useAppDispatch } from '../../../../shared/Redux/store'

import { MyButton } from '../../../UI/button/MyButton'
import { DateSetup } from '../../../../shared/Components/data-setup'

import { deleteAllFormList, submitForm } from '../../redux/slice'
import { deleteDate, setDate } from '../../redux/slice'
import { addWorkout } from '../../redux/slice'

import { CreateItem } from './components/create-item'

import styles from './index.module.scss'

export const CreateList = () => {

    const dispatch = useAppDispatch()

    const { formList, workout, dateCreateWorkout } = useAppSelector(state => state.createWorkout)

    const onCreate = () => {
        const newWorkout = {
            ...workout,
            id: Date.now(),
            date: dateCreateWorkout,
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

    const handleDateChange = (date: Date | null) => {
        if (date) {
            dispatch(setDate(date.toISOString()));
          } else {
            dispatch(setDate(null));
          }
      };

      console.log(dateCreateWorkout);



    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <h2>Собираем тренировку</h2>
                <h3>Тренировка на дату:</h3>
                {/* <DateSetup value={dateCreateWorkout} onChange={handleDateChange} /> */}
                <DateSetup value={dateCreateWorkout} onChange={handleDateChange}/>
                {formList.length > 0 && <MyButton className={styles.btn_dellAll} onClick={handlerDeleteAll}>Удалить всё</MyButton>
                }
            </div>
            <div className={styles.create_exercise_wrapper}>
                {formList.map((exercise, index) =>
                    <CreateItem exercise={exercise} key={exercise.id} index={index} />
                )}
            </div>
            {formList.length > 0 && <MyButton className={styles.button_ok} onClick={onCreate}>Готово!</MyButton>
            }
        </div>
    )
}
