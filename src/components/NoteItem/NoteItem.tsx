import * as React from 'react';
import Button from '../Button/Button';

export interface INoteItem {
    id: string,
    title: string,
    text: string,
    date: Date,
    active: boolean,
    onClick?: (id: string, title: string, text: string, date: Date) => void;
    onDelete?: (id: string) => void;
}

const NoteItem: React.SFC<INoteItem> = ({id, title, text, date, active, onClick, onDelete}) => {
  return (
    <div className={`note-item ${active && 'note-item--active'}`} onClick={() => onClick && onClick(id, title, text, date)}>
        <div className="note-item__content">
          <h3 className="note-item__title">{title}</h3>
          <p className="note-item__text">{text}</p>
        </div>
        {onDelete &&
        <Button label="У" onClick={() => onDelete(id)} icon="" type="button" />
        }
    </div>
  );
};

export default NoteItem;
