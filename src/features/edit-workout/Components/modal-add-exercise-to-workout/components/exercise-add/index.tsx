import React from 'react'

import { useAppDispatch } from '../../../../../../shared/Redux/store'
import { toggleChecked } from '../../../../redux/slice'

import { MyInput } from '../../../../../UI/input/MyInput'

import styles from './index.module.scss'

interface ExerciseAddProps {
    uuid: string
    name: string
    isChecked: boolean
}

export const ExerciseAdd: React.FC<ExerciseAddProps> = ({ name, uuid, isChecked }) => {

    const dispatch = useAppDispatch()

    const handlerChangeChecked = () => {
        dispatch(toggleChecked(uuid))
    }

    return (
        <div className={styles.wrapper}>
         <MyInput label={name} type='checkbox' value={isChecked} onChange={handlerChangeChecked} className={styles.inpCheckBox}/>
        </div>
    )
}
