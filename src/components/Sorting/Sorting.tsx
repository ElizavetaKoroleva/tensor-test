import React, { useEffect } from 'react';
import PopupList from '../PopupList/PopupList';

export interface Option {
    value: string,
    text: string,
}


export interface Sorting {
    options: Option[],
    activeOption: string,
    changeSortingOption: (value: string) => void;
}

const Sorting: React.SFC<Sorting> = ({options, activeOption, changeSortingOption}) => {
    const [isHidden, setIsHidden] = React.useState(true);

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if ((e.target as HTMLSpanElement).classList.contains("option")) {
                setIsHidden(false);
            } else {
                setIsHidden(true);
            }
        })
    })

    return (
        <div className="sorting">
            <span className="sorting__label">Сортировать по</span>
            <div className="sorting__option-container">
                {options.map((option, index) => (
                    option.value === activeOption && 
                    <span className="sorting__option option" key={index}>
                        {option.text}
                    </span>
                ))}
                <div className={`sorting__popup ${isHidden ? 'hidden' : ''}`}>
                    <PopupList list={options} changeSortingOption={changeSortingOption} />
                </div>
            </div>
        </div>
    );
};

export default Sorting;
