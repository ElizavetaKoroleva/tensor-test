import * as React from 'react';
import Button from '../Button/Button';

interface IModal {
    isHidden: boolean;
}

const Modal: React.SFC<IModal> = (props) => {

  return (
    <div className={`modal ${props.isHidden && 'hidden'}`}>
        <div className="modal__window">
          <Button label="" type="button" icon="/cross.svg" />
          {props.children}
        </div>
    </div>
  );
};

export default Modal;
