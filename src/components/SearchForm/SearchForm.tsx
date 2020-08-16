import * as React from 'react';
import { IForm } from '../../types';

const SearchForm: React.FC<IForm> = ({handleInput, placeholder}) => {
  return (
    <div className="search-form">
        <label>
            <input id="search-input" 
                   className="search-form__input" 
                   type="text" 
                   placeholder={placeholder} 
                   onInput={handleInput} />
        </label>
    </div>
  );
};

export default SearchForm;
