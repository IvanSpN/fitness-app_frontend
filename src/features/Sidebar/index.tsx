import { NavLink } from 'react-router-dom'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <ul>
                <li>
                    <NavLink
                        to='/constructor'
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        Создать тренировку
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/workouts'
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        Тренировки
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/statistics'
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        Статистика
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
