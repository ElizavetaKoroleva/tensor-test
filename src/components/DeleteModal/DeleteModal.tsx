import React, { useEffect } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

interface IModal {
    isHidden: boolean;
    text: string;
    confirm: (agreement: boolean) => void;
    closeModal: (hidden: boolean) => void;
}

const DeleteModal: React.SFC<IModal> = ({isHidden, text, confirm, closeModal}) => {
    return (
        <div className="delete-modal">
            <Modal isHidden={isHidden} closeModal={closeModal}> 
                <p className="delete-modal__text">{text}</p>
                <div className="delete-modal__button-container">
                    <Button label="Да" type="button" onClick={() => confirm(true)}/>
                    <Button label="Нет" type="button" onClick={() => confirm(false)}/>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteModal;
