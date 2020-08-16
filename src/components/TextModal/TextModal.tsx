import React, { useEffect } from 'react';
import Modal from '../Modal/Modal';

interface IModal {
    text: string;
}

const TextModal: React.SFC<IModal> = ({text}) => {
    return (
        <div className="text-modal">
            <Modal isHidden={false}> 
                <p className="text-modal__text">{text}</p>
            </Modal>
        </div>
    );
};

export default TextModal;
