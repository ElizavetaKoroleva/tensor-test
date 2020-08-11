import * as React from 'react';
import Button from '../Button/Button';

export interface INote {
    title: string,
    text: string,
}

const Note: React.SFC<INote> = ({title, text}) => {
  return (
    <div className="note">
        <div className="note__buttons-container">
            <Button type="button" label="Редактировать" icon="" />
            <Button type="button" label="Удалить" icon="" />
        </div>
        <div className="note__content">
            <h2 contentEditable="true" className="note__title">{title}</h2>
            <p contentEditable="true" className="note__text">{text}</p>
        </div>
    </div>
  );
};

export default Note;
