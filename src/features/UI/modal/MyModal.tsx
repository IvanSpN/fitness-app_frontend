import React, { ReactNode } from 'react';

import styles from './MyModal.module.scss'

interface ModalProps {
    onClose: () => void,
    isOpen: boolean,
    children: ReactNode,
}

export const MyModal: React.FC<ModalProps> = ({ onClose, isOpen, children }) => {
    if (!isOpen) return null

    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};


