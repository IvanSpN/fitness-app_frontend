import { Header } from '../features/Header'
import { Sidebar } from '../features/Sidebar'
import { Outlet } from 'react-router-dom'

import styles from './MainLayouts.module.scss'

export const MainLayouts = () => {
  return (
    <div className={styles.mainlayouts}>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  )
}
