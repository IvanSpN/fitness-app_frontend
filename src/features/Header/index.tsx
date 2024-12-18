import React from 'react'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Link to='/' className={styles.header}>Fitness_APP</Link>
  )
}
