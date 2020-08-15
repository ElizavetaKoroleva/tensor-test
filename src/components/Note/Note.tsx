import * as React from 'react';
import Button from '../Button/Button';

export interface INote {
    title: string,
    text: string,
    onDelete: (e?: React.MouseEvent) => void;
}

const Note: React.SFC<INote> = ({title, text, onDelete}) => {
  return (
    <div className="note">
        <div className="note__buttons-container">
            <Button type="button" label="Редактировать" icon="" />
            <Button type="button" label="Удалить" icon="" onClick={onDelete}/>
        </div>
        <div className="note__content">
            <h2 contentEditable="true" 
                className="note__title"
                suppressContentEditableWarning={true}>
                  {title}
            </h2>
            <p contentEditable="true" 
               className="note__text" 
               suppressContentEditableWarning={true}>
              {text}
            </p>
        </div>
    </div>
  );
};

export default Note;
