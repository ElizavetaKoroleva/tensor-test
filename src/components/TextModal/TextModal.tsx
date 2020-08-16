import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { IModal } from '../../types';

const TextModal: React.FC<IModal> = ({isHidden, text, closeModal}) => {
    const [hidden, setHidden] = useState(isHidden);
    
    useEffect(() => {
        setHidden(isHidden)
    }, [isHidden])
    
    return (
        <div className="text-modal">
            <Modal isHidden={hidden} closeModal={closeModal}> 
                <p className="text-modal__text">{text}</p>
            </Modal>
        </div>
    );
};

export default TextModal;
