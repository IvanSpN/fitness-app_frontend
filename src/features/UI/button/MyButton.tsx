import React from 'react'

import styles from './MyButton.module.scss'

interface MyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MyButton: React.FC<MyButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={`${styles.myButton} ${className}`}>{children}</button>
  )
}
