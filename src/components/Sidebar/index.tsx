import styles from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <ul>
                <li>
                    <NavLink
                        to='/constructor'
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        Конструктор
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/workouts'
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        Текущие тренировки
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
