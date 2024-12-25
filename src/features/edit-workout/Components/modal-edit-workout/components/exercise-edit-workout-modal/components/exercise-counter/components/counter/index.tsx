import React from 'react'

import { MyButton } from '../../../../../../../../../UI/button/MyButton'

import styles from './index.module.scss'

interface CounterProps {
    value: number
    onIncrement: () => void
    onDecrement: () => void
}

export const Counter: React.FC<CounterProps> = ({ value, onIncrement, onDecrement }) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.counter}>
                <MyButton className={styles.btnCounter} onClick={onDecrement}>-</MyButton>
                <p>{value}</p>
                <MyButton className={styles.btnCounter} onClick={onIncrement}>+</MyButton>
            </div>
        </div>
    )
}
