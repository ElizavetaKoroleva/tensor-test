import React, { useEffect } from 'react';
import Modal from '../Modal/Modal';

interface IModal {
    isHidden: boolean;
    text: string;
    closeModal: (hidden: boolean) => void;
}

const TextModal: React.SFC<IModal> = ({isHidden, text, closeModal}) => {
    const [hidden, setHidden] = React.useState(isHidden);
    
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
