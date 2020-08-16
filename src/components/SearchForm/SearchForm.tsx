import * as React from 'react';

export interface SearchForm {
    placeholder: string;
    handleInput: (e: React.FormEvent) => void;
}

const SearchForm: React.SFC<SearchForm> = ({handleInput, placeholder}) => {
  return (
    <div className="search-form">
        <label>
            <input id="search-input" className="search-form__input" type="text" placeholder={placeholder} 
                   onInput={handleInput} />
        </label>
    </div>
  );
};

export default SearchForm;
