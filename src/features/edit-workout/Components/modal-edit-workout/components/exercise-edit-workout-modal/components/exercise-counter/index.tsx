import React from 'react'

import { Counter } from './components/counter'

import { useAppDispatch } from '../../../../../../../../shared/Redux/store'
import { IExercise } from '../../../../../../../create-workout/redux/slice'
import { setDecrementField, setIncrementField } from '../../../../../../redux/slice'

import styles from './index.module.scss'
import { useAppSelector } from '../../../../../../../../shared/Redux/hooks'

interface ExerciseCounterProps {
    exercise: IExercise
}

export const ExerciseCounter: React.FC<ExerciseCounterProps> = ({ exercise }) => {

    const dispatch = useAppDispatch()

    const {stepCouter} = useAppSelector(state => state.editWorkout)

    const handleIncrement = (field: 'sets' | 'reps' | 'weight', step: string) => {
        dispatch(setIncrementField({ exerciseId: exercise.id, field , step}))
    };

    const handleDecrement = (field: 'sets' | 'reps' | 'weight', step: string) => {
        dispatch(setDecrementField({ exerciseId: exercise.id, field, step }))
    };

    return (
        <>
            <td className={styles.wrapper}>
                <Counter
                    value={exercise.sets}
                    onIncrement={() => handleIncrement('sets', stepCouter)}
                    onDecrement={() => handleDecrement('sets',stepCouter)}
                />
            </td>
            <td>
                <Counter
                    value={exercise.reps}
                    onIncrement={() => handleIncrement('reps', stepCouter)}
                    onDecrement={() => handleDecrement('reps', stepCouter)}
                />
            </td>
            <td>
                <Counter
                    value={exercise.weight ?? 1}
                    onIncrement={() => handleIncrement('weight', stepCouter)}
                    onDecrement={() => handleDecrement('weight',stepCouter)}
                />
            </td>
        </>
    )
}
