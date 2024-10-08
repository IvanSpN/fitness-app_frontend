import React from 'react'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
        <ul>
            <li>Конструктор</li>
            <li>Текущие тренировки</li>
            <li>Статистика</li>
        </ul>

    </nav>
  )
}
