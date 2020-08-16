import * as React from 'react';
import Button from '../Button/Button';

interface IModal {
    isHidden: boolean;
    closeModal: (hidden: boolean) => void;
}

const Modal: React.SFC<IModal> = (props) => {
  const [isHidden, setIsHidden] = React.useState(props.isHidden);

  React.useEffect(() => {
    setIsHidden(props.isHidden);
  }, [props.isHidden])

  return (
    <div className={`modal ${isHidden && 'hidden'}`}>
        <div className="modal__window">
          <Button label="" type="button" icon="/cross.svg" onClick={() => {
            props.closeModal(true);
          }} />
          {props.children}
        </div>
    </div>
  );
};

export default Modal;
