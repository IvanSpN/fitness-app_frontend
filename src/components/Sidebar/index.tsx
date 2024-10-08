import React from 'react'

import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
        <ul>
            <Link to='/constructor'>Конструктор</Link>
            <Link to='/workouts'>Текущие тренировки</Link>
            <Link to='/statistics'>Статистика</Link>
        </ul>

    </nav>
  )
}
