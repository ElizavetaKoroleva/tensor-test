import * as React from 'react';
import NoteItem, { INoteItem } from '../NoteItem/NoteItem';
import SearchForm from '../SearchForm/SearchForm';
import Sorting from '../Sorting/Sorting';

export interface INotesList {
    list: INoteItem[],
    onClick: (id: string, title: string, text: string, date: Date) => void;
}

const NotesList: React.SFC<INotesList> = ({list, onClick}) => {
    const handleInput = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const options = [
        {
            value: "desc",
            text: "убыванию даты",
            active: true
        },
        {
            value: "asc",
            text: "возрастанию даты",
            active: false
        },
    ]

    return (
        <div className="notes-list">
            <div className="notes-list__search-form">
                <SearchForm placeholder="Поиск..." handleInput={handleInput}/>
            </div>
            <div className="notes-list__sorting">
                <Sorting options={options} />
            </div>
            <ul className="notes-list__container">
                {list.map((item) => (
                    <li className="notes-list__item" key={item.id}>
                        <NoteItem id={item.id}
                                title={item.title}
                                text={item.text}
                                date={item.date}
                                onClick={onClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesList;
