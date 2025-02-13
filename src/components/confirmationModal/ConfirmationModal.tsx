import React, {FC, useState} from 'react';
import classes from './ConfirmationModal.module.sass'
import Modal from "../../ui/modal/Modal.tsx";
import Button from "../../ui/button/Button.tsx";

interface ConfirmationModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
       title,
       message,
       onConfirm,
       onCancel,
   }) => {
    const [closing, setClosing] = useState<boolean>(false)
    const handleConfirm = (): void => {
        setClosing(true)
        setTimeout(()=>{
            setClosing(false)
            onConfirm()
        }, 300)
    };

    const handleCancel = (): void => {
        setClosing(true)
        setTimeout(()=>{
            setClosing(false)
            onCancel()
        }, 300)
    }

    return (
        <Modal onClose={onCancel} isVisible={!closing}>
            <h3 className={classes.header}>{title}</h3>
            <p>{message}</p>
            <div className={classes.modalActions}>
                <Button onClick={handleConfirm} variant={'accent'} data-role={'confirmBtn'}>
                    Подтвердить
                </Button>
                <Button onClick={handleCancel} variant={'accent'} data-role={'confirmBtn'}>
                    Отмена
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal