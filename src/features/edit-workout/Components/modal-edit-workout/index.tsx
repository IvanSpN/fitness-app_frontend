import { useRef, useState } from 'react'
import Select from 'rc-select';
import { v4 as uuidv4 } from 'uuid';


import { IoCloseOutline } from "react-icons/io5";

import { MyButton } from '../../../UI/button/MyButton'
import { MyInput } from '../../../UI/input/MyInput'
import { ExerciseEditWorkoutModal } from './components/exercise-edit-workout-modal'

import { toggleModal, setDelWorkout, setWorkoutDate, setStepCounter, setClearStepCounter, setChangeIntensity, setChangeType } from '../../redux/slice'
import { addWorkout, updateWorkout } from '../../../display-list-workout/redux/slice'
import { useAppSelector } from '../../../../shared/Redux/hooks'
import { useAppDispatch } from '../../../../shared/Redux/store'

import { DateSetup } from '../../../../shared/Components/data-setup'
import { optionsIntensity, optionsType } from '../../../create-workout/Components/create-list';

import styles from './index.module.scss'

export const EditWorkoutModal = () => {

    const [isInputFocused, setIsInputFocused] = useState(false);

    const stepCounterRef = useRef<HTMLInputElement>(null);


    const dispatch = useAppDispatch()

    const { workout, mode, stepCouter } = useAppSelector(state => state.editWorkout)

    if (!workout) {
        return <p>Тренировка не найдена.</p>;
    }

    if (!workout.exercises || workout.exercises.length === 0) {
        return <p>Нет доступных упражнений для редактирования.</p>;
    }

    const handlerUpdateWorkout = () => {
        if (mode == 'copy') {
            dispatch(addWorkout({ ...workout, uuid: uuidv4()}))
            dispatch(toggleModal({ modal: 'mainModalOpen', value: false }))
        }
        else if (mode == 'edit') {
            dispatch(updateWorkout(workout))
            dispatch(toggleModal({ modal: 'mainModalOpen', value: false }))
        }
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            dispatch(setWorkoutDate(date ? date.toISOString() : null));
        } else {
            dispatch(setWorkoutDate(null));
        }
    };

    const handlerDelExercise = (uuid: string) => {
        dispatch(setDelWorkout(uuid))

    };

    const openAddWorkoutModal = () => {
        dispatch(toggleModal({ modal: 'addExcersiseOpen', value: true }))
    }

    const handlerChangeInput = () => {
        if (stepCounterRef.current) {
            const inputValue = stepCounterRef.current.value;
            const numberValue = inputValue.replace(/[^\d.-]/g, '');

            console.log('Filtered Input value:', numberValue);
            dispatch(setStepCounter(numberValue));
        }
    };

    const handlerClearInput = () => {
        dispatch(setClearStepCounter())
    }

    const handleChangeIntensity = (value: string) => {
        dispatch(setChangeIntensity(value))
    }
    const handleChangeType = (value: string) => {
        dispatch(setChangeType(value))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock}>
                <DateSetup value={workout.date} onChange={handleDateChange} />
                <MyButton className={styles.btnAddExercise} onClick={openAddWorkoutModal}>Добавить упражнения</MyButton>
                <MyInput ref={stepCounterRef} type='text' value={stepCouter} onChange={handlerChangeInput} label='Установить шаг -/+'
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                />
                <IoCloseOutline className={`${styles.clearIcon} ${isInputFocused && +stepCouter > 0 ? styles.clearIconFocused : ''}`} onClick={handlerClearInput} />
            </div>
            <div className={styles.intensityInfo}>
                <label>Интенсивность тренировки: </label>
                <Select
                    value={workout.intensity}
                    onChange={handleChangeIntensity}
                    showSearch
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    options={optionsIntensity.map(option => ({ value: option, label: option }))}
                />
                <label>Тип тренировки: </label>
                <Select
                    value={workout.type}
                    onChange={handleChangeType}
                    showSearch
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    options={optionsType.map(option => ({ value: option, label: option }))}
                />
            </div>
            <div>
                <table>
                    <tr className={styles.info}>
                        <td>Упражнение</td>
                        <td>Количество подходов</td>
                        <td>Количество повторов</td>
                        <td>Вес</td>
                        <td style={{ minWidth: '50px' }}></td>
                    </tr>
                    {workout.exercises.map((exercise) => (
                        <ExerciseEditWorkoutModal key={exercise.exercise_uuid} exercise={exercise} handlerDelExercise={handlerDelExercise} />
                    ))}
                </table>
            </div>
            <MyButton className={styles.btnOk} onClick={handlerUpdateWorkout}>Готово</MyButton>
        </div>
    )
}


