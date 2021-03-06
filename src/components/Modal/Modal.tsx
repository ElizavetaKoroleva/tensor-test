import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { IModal } from '../../types'; 

const Modal: React.FC<IModal> = (props) => {
  const { isHidden, closeModal, children } = props;
  const [hidden, setHidden] = useState(isHidden);

  useEffect(() => {
    setHidden(isHidden);
  }, [isHidden])

  return (
    <div className={`modal ${hidden && 'hidden'}`}>
        <div className="modal__window">
          <Button label="Закрыть" type="button" icon="/cross.svg" onClick={() => {
            closeModal(true);
          }} />
          {children}
        </div>
    </div>
  );
};

export default Modal;
