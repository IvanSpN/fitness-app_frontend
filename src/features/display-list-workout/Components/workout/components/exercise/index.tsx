import React, { useEffect } from 'react'

import styles from './index.module.scss'
import { useAppSelector } from '../../../../../../shared/Redux/hooks';
import { getExercisesListItemsAPI } from '../../../../../create-workout/redux/thunks';
import { useAppDispatch } from '../../../../../../shared/Redux/store';

interface ExerciseProps {
    uuid: string,
    name: string,
    sets: number,
    reps: number,
    weight?: number
}
const getRepsForm = (reps: number): string => {
    const pluralRules = new Intl.PluralRules('ru', { type: 'cardinal' });
    switch (pluralRules.select(reps)) {
        case 'one':
            return 'раз';
        case 'few':
            return 'раза';
        default:
            return 'раз';
    }
}
const getSetsForm = (sets: number): string => {
    const pluralRules = new Intl.PluralRules('ru', { type: 'cardinal' });
    switch (pluralRules.select(sets)) {
        case 'one':
            return 'подход';
        case 'few':
            return 'подхода';
        default:
            return 'подходов';
    }
}

export const Exercise: React.FC<ExerciseProps> = ({ name, sets, reps, weight, uuid }) => {

    const dispatch =  useAppDispatch()

    const exercise = useAppSelector((state)=> state.createWorkout.dataExercisesList.find((el)=> el.uuid === uuid))

    return (
        <div className={styles.wrapper}>
            <div className={styles.exerciseDetails}>
                <span className={styles.name}>{name}</span>
                <span className={styles.sets}>{sets} {getSetsForm(sets)} по</span>
                <span className={styles.reps}>{reps} {getRepsForm(reps)}</span>
                {!!weight && <span className={styles.weight}>{weight} кг</span>}
            </div>
        </div>
    )
}
