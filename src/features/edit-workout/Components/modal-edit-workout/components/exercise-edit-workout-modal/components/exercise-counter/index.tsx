import React from 'react'

import { Counter } from './components/counter'

import { useAppDispatch } from '../../../../../../../../shared/Redux/store'
import { IExercise } from '../../../../../../../create-workout/redux/slice'
import { setDecrementField, setIncrementField } from '../../../../../../redux/slice'

import styles from './index.module.scss'

interface ExerciseCounterProps {
    exercise: IExercise
}

export const ExerciseCounter: React.FC<ExerciseCounterProps> = ({ exercise }) => {

    const dispatch = useAppDispatch()

    const handleIncrement = (field: 'sets' | 'reps' | 'weight') => {
        dispatch(setIncrementField({ exerciseId: exercise.id, field }))
    };

    const handleDecrement = (field: 'sets' | 'reps' | 'weight') => {
        dispatch(setDecrementField({ exerciseId: exercise.id, field }))
    };

    return (
        <>
            <td className={styles.wrapper}>
                <Counter
                    value={exercise.sets}
                    onIncrement={() => handleIncrement('sets')}
                    onDecrement={() => handleDecrement('sets')}
                />
            </td>
            <td>
                <Counter
                    value={exercise.reps}
                    onIncrement={() => handleIncrement('reps')}
                    onDecrement={() => handleDecrement('reps')}
                />
            </td>
            <td>
                <Counter
                    value={exercise.weight}
                    onIncrement={() => handleIncrement('weight')}
                    onDecrement={() => handleDecrement('weight')}
                />
            </td>
        </>
    )
}
