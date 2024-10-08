import React from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export const MainLayouts = () => {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}
