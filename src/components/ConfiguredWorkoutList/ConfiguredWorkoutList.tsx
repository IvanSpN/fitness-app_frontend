import React from 'react'

import { ConfiguredWorkoutListItem } from '../ConfiguredWorkoutListItem/ConfiguredWorkoutListItem'

import { useAppSelector } from '../../shared/Redux/hooks'
import { useAppDispatch } from '../../shared/Redux/store'

import styles from './ConfiguredWorkoutList.module.scss'

export const ConfiguredWorkoutList = () => {


    const dispatch = useAppDispatch()


    const { dataConfiguredWorkoutList } = useAppSelector(state => state.configuredWorkoutList)



    return (
        <div>
            {dataConfiguredWorkoutList.map((exercise, index) =>
                 <ConfiguredWorkoutListItem name={exercise.name} key={exercise.id} index={index}/>
            )}
        </div>
    )
}
