import * as React from 'react';
import Button from '../Button/Button';

export interface INote {
    id: string,
    title: string,
    text: string,
    isEditable: boolean,
    onDelete: (e?: React.MouseEvent) => void;
    onEdit: () => void;
    onCancel: () => void;
    onSave: (id: string, title: string, text: string) => void;
}

const Note: React.SFC<INote> = ({id, title, text, isEditable, onDelete, onEdit, onCancel, onSave}) => {
  const [currentTitle, setCurrentTitle] = React.useState(title);
  const [previousTitle, setPreviousTitle] = React.useState(title);
  const [currentText, setCurrentText] = React.useState(text);
  const [previousText, setPreviousText] = React.useState(text);

  React.useEffect(() => {
    if (isEditable) {
      setPreviousTitle(currentTitle);
      setPreviousText(currentText);
    }
  }, [isEditable])

  return (
    <div className="note">
        <div className={`note__buttons-container ${isEditable && "hidden"}`}>
            <Button type="button" 
                    label="Редактировать" 
                    onClick={onEdit} />
            <Button type="button" label="Удалить" onClick={onDelete}/>
        </div>
        <div className={`note__buttons-container ${!isEditable && "hidden"}`}>
            <Button type="button" 
                    label="Сохранить" 
                    onClick={() => onSave(id, currentTitle, currentText)} />
            <Button type="button" label="Отмена" onClick={() => {
              setCurrentTitle(previousTitle);
              setCurrentText(previousText);
              onCancel();
            }}/>
        </div>
        <div className={`note__content ${isEditable && 'hidden'}`}>
            <h2 className="note__title">
              {currentTitle}
            </h2>
            <p className="note__text" >
              {currentText}
            </p>
        </div>
        <div className={`note__content ${!isEditable && 'hidden'}`}>
            <textarea className="note__input note__input--title" 
                      value={currentTitle}
                      onChange={(e) => setCurrentTitle(e.target.value)}
            />
            <textarea className="note__input note__input--text" 
                      value={currentText}
                      onChange={(e) => setCurrentText(e.target.value)}
            />
        </div>
    </div>
  );
};

export default Note;
