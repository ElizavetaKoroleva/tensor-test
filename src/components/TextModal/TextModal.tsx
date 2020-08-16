import React, { useEffect } from 'react';
import Modal from '../Modal/Modal';

interface IModal {
    isHidden: boolean;
    text: string;
    openModal: () => void;
}

const TextModal: React.SFC<IModal> = ({isHidden, text, openModal}) => {
    return (
        <div className="text-modal">
            <Modal isHidden={isHidden} openModal={openModal} > 
                <p className="text-modal__text">{text}</p>
            </Modal>
        </div>
    );
};

export default TextModal;
