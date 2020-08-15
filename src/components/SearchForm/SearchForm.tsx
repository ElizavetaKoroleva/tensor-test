import * as React from 'react';

export interface SearchForm {
    placeholder: string;
    handleInput: (e: React.FormEvent) => void;
}

const SearchForm: React.SFC<SearchForm> = ({handleInput, placeholder}) => {
  return (
    <form className="search-form" onInput={handleInput} onSubmit={(e) => e.preventDefault()}>
        <label>
            <input className="search-form__input" type="text" placeholder={placeholder} />
        </label>
    </form>
  );
};

export default SearchForm;
