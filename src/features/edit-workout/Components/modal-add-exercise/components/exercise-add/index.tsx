import React from 'react'

import { useAppDispatch } from '../../../../../../shared/Redux/store'
import { toggleChecked } from '../../../../redux/slice'

import styles from './index.module.scss'

interface ExerciseAddProps {
    name: string
    id: number
    isChecked: boolean
}

export const ExerciseAdd: React.FC<ExerciseAddProps> = ({ name, id, isChecked }) => {

    const dispatch = useAppDispatch()

    const handlerChangeChecked = () => {
        dispatch(toggleChecked(id))
    }

    return (
        <div className={styles.wrapper}>
            <label className={styles.checkboxLabel}>
                <input
                    type='checkbox'
                    className={styles.inpCheckBox}
                    onChange={handlerChangeChecked}
                    checked={isChecked}
                />
                {name}
            </label>
        </div>
    )
}
