import * as React from 'react';
import Button from '../Button/Button';

interface IModal {
    isHidden: boolean;
    
    openModal: () => void;
}

const Modal: React.SFC<IModal> = (props) => {
  const [isHidden, setIsHidden] = React.useState(props.isHidden);

  const closeModal = () => {
    setIsHidden(true);
  };

  return (
    <div className={`modal ${isHidden && 'hidden'}`}>
        <div className="modal__window">
          <Button label="" type="button" icon="/cross.svg" onClick={closeModal} />
          {props.children}
        </div>
    </div>
  );
};

export default Modal;
