import * as React from 'react';

export interface IItem {
    text: string,
    value: string,
    active: boolean,
}

export interface IPopupList {
    list: IItem[],
}

const PopupList: React.SFC<IPopupList> = ({list}) => {
  return (
    <div className="popup-list">
        <ul className="popup-list__container">
            {list.map((item) => (
                <li className="popup-list__item" key={item.value}>
                    {item.text}
                </li>
            ))}
        </ul>
    </div>
  );
};

export default PopupList;
