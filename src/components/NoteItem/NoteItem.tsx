import * as React from 'react';

export interface INoteItem {
    id: string,
    title: string,
    text: string,
    date: Date,
    onClick?: (id: string, title: string, text: string, date: Date) => void;
}

const NoteItem: React.SFC<INoteItem> = ({id, title, text, date, onClick}) => {
  return (
    <div className="note-item" onClick={() => onClick && onClick(id, title, text, date)}>
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__text">{text}</p>
        
    </div>
  );
};

export default NoteItem;
