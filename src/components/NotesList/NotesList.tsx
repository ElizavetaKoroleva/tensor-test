import * as React from 'react';
import NoteItem, { INoteItem } from '../NoteItem/NoteItem';
import SearchForm from '../SearchForm/SearchForm';
import Sorting from '../Sorting/Sorting';

export interface INotesList {
    list: INoteItem[],
}

const NotesList: React.SFC<INotesList> = ({list}) => {
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
                {list.map((item, index) => (
                    <li className="notes-list__item" key={index}>
                        <NoteItem title={item.title}
                                text={item.text}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesList;
