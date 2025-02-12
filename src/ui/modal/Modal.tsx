import React, { FC, useState, useEffect } from 'react';
import classes from './Modal.module.sass'

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    isVisible?: boolean
    delay?: number
}

const Modal: FC<ModalProps> = ({children, onClose, isVisible, delay}) => {
    const [closing, setClosing] = useState<boolean>(false);

    const handleOverlayClick = (event: React.MouseEvent): void => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const closeModal = (): void => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, delay || 300);
    };

    useEffect(() => {
        if (isVisible) {
            setClosing(false)
        } else {
            setClosing(true)
        }
    }, [isVisible]);

    return (
        <div className={`${classes.modalOverlay} ${closing? classes.modalOverlayClosing : ""}`} onClick={handleOverlayClick}>
            <div className={`${classes.modalContent} ${closing? classes.modalContentClosing : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal