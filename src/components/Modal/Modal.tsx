import * as React from 'react';
import Button from '../Button/Button';

interface IModal {
    text: string;
    submit: () => void;
    cancel: () => void;
    isHidden: boolean;
}

const Modal: React.SFC<IModal> = ({text, submit, cancel, isHidden}) => {
  return (
    <div className={`modal ${isHidden && 'hidden'}`}>
       <div className="">
           <p className="modal__text">{text}</p>
           <Button label="Да" onClick={submit} type="button" />
           <Button label="Отмена" onClick={cancel} type="button" />
       </div>
    </div>
  );
};

export default Modal;
