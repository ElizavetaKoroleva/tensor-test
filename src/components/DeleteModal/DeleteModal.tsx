import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { IModal } from '../../types';

const DeleteModal: React.FC<IModal> = ({isHidden, text, confirm, closeModal}) => {
    return (
        <div className="delete-modal">
            <Modal isHidden={isHidden} closeModal={closeModal}> 
                <p className="delete-modal__text">{text}</p>
                <div className="delete-modal__button-container">
                    <Button label="Да" 
                            text="Да" 
                            type="button" 
                            onClick={() => confirm && confirm(true)}/>
                    <Button label="Нет" 
                            text="Нет" 
                            type="button" 
                            onClick={() => confirm && confirm(false)}/>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteModal;
