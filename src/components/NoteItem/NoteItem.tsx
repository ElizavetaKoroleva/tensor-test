import * as React from 'react';
import Button from '../Button/Button';
import { INoteItem } from '../../types';

const NoteItem: React.FC<INoteItem> = ({id, title, text, date, active, onClick, onDelete}) => {
  return (
    <div className={`note-item ${active && 'note-item--active'}`} 
         onClick={() => onClick && onClick(id, title, text, date)}>
        <div className="note-item__content">
          <h3 className="note-item__title">{title}</h3>
          <p className="note-item__text">{text}</p>
        </div>
        {onDelete &&
        <div className="note-item__button">
          <Button 
              label="Удалить" 
              onClick={(e) => onDelete(id, e)} 
              icon="/bin.svg" 
              type="button" 
          />
        </div>
        }
    </div>
  );
};

export default NoteItem;
