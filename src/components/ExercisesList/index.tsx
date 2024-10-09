import React from 'react'

import { ExercisesListItem } from '../ExercisesListItem'

import exercisesList from '../../data/DB'

import styles from './ExercisesList.module.scss'

export const ExercisesList = () => {
  return (
    <div>
      {exercisesList.map((exs)=>{
       return  <ExercisesListItem name={exs.name}/>
      })}
    </div>
  )
}
