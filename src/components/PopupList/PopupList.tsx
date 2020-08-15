import * as React from 'react';

export interface IItem {
    text: string,
    value: string,
    active: boolean,
}

export interface IPopupList {
    list: IItem[],
    changeSortingOption: (value: string) => void;
}

const PopupList: React.SFC<IPopupList> = ({list, changeSortingOption}) => {
    const [activeOption, setActiveOption] = React.useState(); 

    return (
        <div className="popup-list">
            <ul className="popup-list__container">
                {list.map((item) => (
                    <li className="popup-list__item" key={item.value} onClick={() => changeSortingOption(item.value)}>
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopupList;
