import React, {useState} from "react";

import styles from '../styles/modal.module.css';

const Modal = ({isOpen, onClose, children}) => {
    return (
        <>
        {isOpen && (
            <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
                <span className={styles.closeButton} onClick={onClose}>
                    &times;
                </span>
                {children}
            </div>
        </div>
        )}
        </>
    );
};

export default Modal;