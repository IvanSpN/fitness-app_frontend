import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

import styles from './MainLayouts.module.scss'

export const MainLayouts = () => {
  return (
    <div className={styles.mainlayouts}>
        <Header/>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}
