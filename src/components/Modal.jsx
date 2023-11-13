import React, {useState} from "react";

import styles from '../styles/modal.module.css';

const Modal = ({isOpen, onClose, children}) => {
    return (
        <>
        {isOpen && (
            <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>

                <div className="absolute top-4 right-4 cursor-pointer w-8 h-8 border border-2 border-gray-300 rounded-full flex items-center justify-center" onClick={onClose}>
                    <div>
                        <div className="absolute h-1 bg-gray-500 w-5 rounded-lg transform -rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute h-1 bg-gray-500 w-5 rounded-lg transform rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>
                {children}
            </div>
        </div>
        )}
        </>
    );
};

export default Modal;