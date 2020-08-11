import * as React from 'react';

export interface INoteItem {
    title: string,
    text: string,
}

const NoteItem: React.SFC<INoteItem> = ({title, text}) => {
  return (
    <div className="note-item">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__text">{text}</p>
    </div>
  );
};

export default NoteItem;
