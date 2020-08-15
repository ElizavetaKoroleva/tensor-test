import * as React from 'react';
import NoteItem, { INoteItem } from '../NoteItem/NoteItem';

export interface INotesList {
    list: INoteItem[],
    activeNote: string,
    onClick: (id: string, title: string, text: string, date: Date) => void;
    onDelete: (id: string) => void;
}

const NotesList: React.SFC<INotesList> = ({list, activeNote, onClick, onDelete}) => {
    return (
        <div className="notes-list">
            <ul className="notes-list__container">
                {list.map((item) => (
                    <li className="notes-list__item" key={item.id}>
                        <NoteItem id={item.id}
                                title={item.title}
                                text={item.text}
                                date={item.date}
                                onClick={onClick}
                                onDelete={onDelete}
                                active={activeNote === item.id}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesList;
