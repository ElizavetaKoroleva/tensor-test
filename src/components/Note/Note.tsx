import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { INote } from '../../types'; 

const Note: React.FC<INote> = ({id, title, text, isEditable, onDelete, onEdit, onCancel, onSave}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [previousTitle, setPreviousTitle] = useState(title);
  const [currentText, setCurrentText] = useState(text);
  const [previousText, setPreviousText] = useState(text);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isEditable) {
      setPreviousTitle(currentTitle);
      setPreviousText(currentText);
    }
  }, [isEditable])

  useEffect(() => {
    setCurrentTitle(title);
  }, [title])

  useEffect(() => {
    setCurrentText(text);
  }, [text])

  const checkForErrors = (field: string) => {
    if (!field.trim().length) {
      showError();
    } else {
      hideError();
    }
  };

  const showError = () => {
    setIsError(true);
  };

  const hideError = () => {
    setIsError(false);
  };

  return (
    <div className="note">
        <div className={`note__buttons-container ${isEditable && "hidden"}`}>
            <Button type="button" 
                    label="Редактировать" 
                    text="Редактировать"
                    onClick={onEdit} />
            <Button type="button" 
                    label="Удалить" 
                    text="Удалить"
                    onClick={onDelete}/>
        </div>
        <div className={`note__buttons-container ${!isEditable && "hidden"}`}>
            <Button type="button" 
                    label="Сохранить" 
                    text="Сохранить"
                    onClick={() => {
                      !isError && onSave(id, currentTitle, currentText);
                    }} />
            <Button type="button" 
                    label="Отмена" 
                    text="Отмена"
                    onClick={() => {
                      setCurrentTitle(previousTitle);
                      setCurrentText(previousText);
                      onCancel();
                      }}
            />
        </div>
        <div className={`note__content ${isEditable && "hidden"}`}>
            <h2 className="note__title">
              {currentTitle}
            </h2>
            <p className="note__text" >
              {currentText}
            </p>
        </div>
        <div className={`note__content ${!isEditable && "hidden"}`}>
            <span className={`note__error ${!isError && "hidden"}`}>
              Заметка должна содержать заголовок и текст.
            </span>
            <textarea className="note__input note__input--title" 
                      value={currentTitle}
                      onChange={(e) => {
                        setCurrentTitle(e.target.value);
                        checkForErrors(e.target.value);
                      }}
            />
            <textarea className="note__input note__input--text" 
                      value={currentText}
                      onChange={(e) => {
                        setCurrentText(e.target.value);
                        checkForErrors(e.target.value);
                      }}
            />
        </div>
    </div>
  );
};

export default Note;
