import React from 'react'

import { CreateList } from '../create-workout/Components/create-list/index'
import { ExercisesList } from '../create-workout/Components/exercises-list'

import styles from './index.module.scss'

export const CreateWorkout: React.FC = () => {

    return (
        <div className={styles.wrapper}>
            <ExercisesList />
            <CreateList />
        </div>
    )
}
