import React from 'react'

import { MyButton } from '../../../UI/button/MyButton';
import { useAppDispatch } from '../../../../shared/Redux/store';
import {  setRescheduleDate, setRescheduleWorkouts, } from '../../../display-list-workout/redux/slice';
import { useAppSelector } from '../../../../shared/Redux/hooks'
import { IEditWorkoutInitialState, toggleModal, setEditWorkout, setModalMode } from '../../../edit-workout/redux/slice';
import { Exercise } from './components/exercise';

import styles from './index.module.scss'
import { DateSetup } from '../../../../shared/Components/data-setup';
import { Exercises } from '../../../create-workout/redux/types';
import { deleteWorkoutAPI, markSkipWorkoutAPI, rescheduleWorkoutAPI } from '../../redux/thuks';

interface WorkoutProps {
    date: string | null
    uuid: string
    intensity: null | string
    type: null | string
    exercises: Exercises.Response.WorkoutExercise []
    isSkip: boolean
}

export const Workout: React.FC<WorkoutProps> = ({ date, uuid, intensity, type, isSkip, exercises }) => {

    const dispatch = useAppDispatch()

    const workout = useAppSelector(state => state.displayListWorkout.workouts.find((workout) => workout.uuid === uuid))
    console.log('work', workout);

    // const findWorkoutById = (uuid: string) => {
    //     return workouts.find((workout) => workout.uuid === uuid)
    // }

    const handlerDeleteWorkout = (uuid: string) => {
        dispatch(deleteWorkoutAPI(uuid))
    }

    const handlerEditWorkout = (mode: IEditWorkoutInitialState['mode']) => {

        if (workout) {
            dispatch(setEditWorkout(workout))
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

    const handlerToggleSkip = () => {
        dispatch(markSkipWorkoutAPI(uuid))
    }

    const handlerRescheduleDate = (newDate: Date | null) => {
        const formattedDate = newDate ? newDate.toISOString() : "";
        dispatch(rescheduleWorkoutAPI({uuid, date: formattedDate }))
        dispatch(setRescheduleDate({ uuid, date: formattedDate }));
    }

    const handlerRescheduleWorkouts = (newDate: Date | null) => {
        const formattedDate = newDate ? newDate.toISOString() : null;
        dispatch(setRescheduleWorkouts({ uuid, date: formattedDate }))
    }

    return (
        <div className={`${styles.wrapper} ${isSkip ? styles.skipActive : ''}`}>
            <div className={styles.topBlock}>
                <h2>{uuid}</h2>
                <div className={styles.infoBlock}>
                    <p className={styles.intensityInfo}>Интенсивновсть: {intensity}</p>
                    {type && <p className={styles.intensityInfo}>Тип: {type}</p>}
                </div>
            </div>
            <h3>{date ? formatDate(date) : 'Нет даты'}</h3>
            <div className={styles.middle_block}>
                <div className={styles.skip_wrapper}>
                    {isSkip ? <MyButton className={styles.btnSkip} onClick={handlerToggleSkip}>Отменить пометку пропущенной тренировки</MyButton>
                        : <MyButton className={styles.btnSkip} onClick={handlerToggleSkip}>Отметить тренировку как пропущенную?</MyButton>
                    }
                </div>
                <div className={styles.reschedule_wrapper}>
                    <p>Перенести тренировку на: <DateSetup value={date} onChange={handlerRescheduleDate} /></p>
                </div>
                <div className={styles.reschedule_wrapper}>
                    <p>Перенести тренировку СО СМЕЩЕНИЕМ на: <DateSetup value={date} onChange={handlerRescheduleWorkouts} /></p>
                </div>
            </div>
            <div>
                {exercises && exercises.length > 0 ? (
                    exercises.map((exercise) => (
                        <Exercise
                            key={exercise.exercise_uuid}
                            uuid={exercise.exercise_uuid}
                            name={exercise.exercise?.name || ''}
                            sets={exercise.sets}
                            reps={exercise.reps}
                            weight={exercise.weight}
                        />
                    ))
                ) : (
                    <p>Нет упражнений для этой тренировки.</p>
                )}
            </div>
            <MyButton className={styles.btn_del} onClick={() => handlerDeleteWorkout(uuid)}>Удалить тренировку</MyButton>
            <MyButton className={styles.btn_del} onClick={() => handlerEditWorkout('edit')}>Редактировать тренировку</MyButton>
            <MyButton className={styles.btn_del} onClick={() => handlerEditWorkout('copy')}>Копировать тренировку</MyButton>
        </div>
    )
}
