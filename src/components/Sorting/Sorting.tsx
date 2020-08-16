import React, { useEffect } from 'react';
import PopupList from '../PopupList/PopupList';
import { ISorting } from '../../types';

const Sorting: React.FC<ISorting> = ({options, activeOption, changeSortingOption}) => {
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
