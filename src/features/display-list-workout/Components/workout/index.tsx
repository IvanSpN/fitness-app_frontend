import React from 'react'
import { IExercise } from '../../../create-workout/redux/slice';
import { MyButton } from '../../../UI/button/MyButton';
import { useAppDispatch } from '../../../../shared/Redux/store';
import { delWorkout } from '../../../display-list-workout/redux/slice';
import { useAppSelector } from '../../../../shared/Redux/hooks'
import { IEditWorkoutInitialState, toggleModal, setEditWorkout, setModalMode } from '../../../edit-workout/redux/slice';

import styles from './index.module.scss'
import { Exercise } from './components/exercise';

interface WorkoutProps {
    date: string | null,
    id: number,
    exercises: IExercise[],
}

export const Workout: React.FC<WorkoutProps> = ({ date, id, exercises }) => {
    const dispatch = useAppDispatch()

    const { workouts } = useAppSelector(state => state.displayListWorkout)

    const findWorlutById = (id: number) => {
        return workouts.find((workout) => workout.id === id)

    }

    const handlerDeleteWorkout = (id: number) => {
        dispatch(delWorkout(id))
    }

    const handlerEditWorkout = (id: number, mode: IEditWorkoutInitialState['mode']) => {
        const foundWorkout = findWorlutById(id)
        if (foundWorkout) {
            dispatch(setEditWorkout(foundWorkout))
            dispatch(setModalMode(mode))
            dispatch(toggleModal({ modal: 'mainModalOpen', value: true }))
        }
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
        <div className={styles.wrapper}>
            <h2>{id}</h2>
            <h3>{date ? formatDate(date) : 'Нет даты'}</h3>
            <div>
                {exercises.map((exercise) => <Exercise key={exercise.id}
                    id={exercise.id}
                    name={exercise.name}
                    sets={exercise.sets}
                    reps={exercise.reps}
                    weight={exercise.weight} />)}
            </div>
            <MyButton className={styles.btn_del} onClick={() => handlerDeleteWorkout(id)}>Удалить тренировку</MyButton>
            <MyButton className={styles.btn_del} onClick={() => handlerEditWorkout(id, 'edit')}>Редактировать тренировку</MyButton>
            <MyButton className={styles.btn_del} onClick={() => handlerEditWorkout(id, 'copy')}>Копировать тренировку</MyButton>
        </div>
    )
}
