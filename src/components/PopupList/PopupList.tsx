import * as React from 'react';
import { IPopupList } from '../../types';

const PopupList: React.FC<IPopupList> = ({list, changeSortingOption}) => {
    return (
        <div className="popup-list">
            <ul className="popup-list__container">
                {list.map((item) => (
                    <li className="popup-list__item" 
                        key={item.value} 
                        onClick={() => changeSortingOption(item.value)}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopupList;
