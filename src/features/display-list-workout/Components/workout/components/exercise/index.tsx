import React from 'react'

import styles from './index.module.scss'

interface ExerciseProps {
    id: any,
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

export const Exercise: React.FC<ExerciseProps> = ({ name, sets, reps, weight }) => {

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
