import React, { useState } from 'react'
import { MyButton } from '../../UI/button/MyButton'

import styles from './ExerciseModal.module.scss'

export const ExerciseModal = () => {

    const [plus, setPlus] = React.useState({})


    const handlerBtnPlus = () => {


    }

    const handlerBtnMinus = () => {

    }
    return (
        <div className={styles.wrapper}>
            <p>Жим лежа</p>
            <div className={styles.wrapperCounter}>
                <div className={styles.counter}>
                    <MyButton className={styles.btnCounter}>-</MyButton>
                    <p></p>
                    <MyButton className={styles.btnCounter}>+</MyButton>
                </div>
                <div className={styles.counter}>
                    <MyButton className={styles.btnCounter}>-</MyButton>
                    <p>5</p>
                    <MyButton className={styles.btnCounter}>+</MyButton>
                </div>
                <div className={styles.counter}>
                    <MyButton className={styles.btnCounter}>-</MyButton>
                    <p>5</p>
                    <MyButton className={styles.btnCounter}>+</MyButton>
                </div>
            </div>
        </div>
    )
}
