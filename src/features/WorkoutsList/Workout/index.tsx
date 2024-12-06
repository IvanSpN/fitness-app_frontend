import React, { useState } from 'react'
import { ExercisesArray } from '../ExercisesArray';
import { IExercise } from '../../ConfiguredWorkoutList/redux/slice';
import { MyButton } from '../../UI/button/MyButton';
import { useAppDispatch } from '../../../shared/Redux/store';
import { delWorkout } from '../redux/slice';
import MyModal from '../../UI/modal/MyModal';
import { EditWorkout } from '../EditWorkout';

import styles from './Workout.module.scss'

interface WorkoutProps {
    date: string | null,
    id: number,
    exercises: IExercise[],
}

export const Workout: React.FC<WorkoutProps> = ({ date, id, exercises }) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const dispatch = useAppDispatch()

    const handlerDeleteWorkout = (id: number) => {
        dispatch(delWorkout(id))
    }

    const handlerEditWorkout = (id: number) => {
        setModalOpen(true)

    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ru', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    }
    return (
        <>
            <div className={styles.wrapper}>
                <h2>{id}</h2>
                <h3>{date ? formatDate(date) : 'Нет даты'}</h3>
                {exercises.length > 0 ? <ExercisesArray exercises={exercises} /> : 'Упражнения отсутствуют'}
                <MyButton className={styles.btn_del} onClick={() => handlerDeleteWorkout(id)}>Удалить тренировку</MyButton>
                <MyButton className={styles.btn_del} onClick={() => handlerEditWorkout(id)}>Редактировать тренировку</MyButton>
            </div>
            <MyModal isOpen={isModalOpen} onClose={closeModal}>
                <EditWorkout />
                <MyButton className={styles.btnOk}>Готово!</MyButton>
            </MyModal>
        </>
    )
}
