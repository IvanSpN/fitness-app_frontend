import React from 'react'

import styles from './ConfiguredWorkoutList.module.scss'

export const ConfiguredWorkoutList = () => {
  return (
    <div>
    {exercisesList.map((exs)=>{
     return  <ConfiguredWorkoutList name={exs.name}/>
    })}
  </div>
  )
}
