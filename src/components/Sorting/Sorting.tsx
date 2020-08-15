import * as React from 'react';
import PopupList from '../PopupList/PopupList';

export interface Option {
    value: string,
    text: string,
    active: boolean
}


export interface Sorting {
    options: Option[],
    changeSortingOption: (value: string) => void;
}

const Sorting: React.SFC<Sorting> = ({options, changeSortingOption}) => {
    const [isHidden, setIsHidden] = React.useState(true);
    
    const showPopup = () => {
        setIsHidden(false);
    } 

    return (
        <div className="sorting">
            <span className="sorting__label">Сортировать по</span>
            <div className="sorting__option-container">
                {options.map((option, index) => (
                    option.active && 
                    <span className="sorting__option" onClick={showPopup} key={index}>
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
