import * as React from 'react';
import Button from '../Button/Button';
import NotesList from '../NotesList/NotesList';
import Note from '../Note/Note';

const NotesEditor: React.SFC = () => {
  const list = [
    {
      title: "Заголовок заметки dfg dfg dfgdfg dfg dfg",
      text: "Текст заметки вапвап вапвап апвп"
    },
    {
      title: "Заголовок заметки",
      text: "Текст заметки вапвап вапвап апвп dfg dfg dfg dfg dfg "
    },
    {
      title: "Заголовок заметки",
      text: "Текст заметки вапвап вапвап апвп"
    },
    {
      title: "Заголовок заметки",
      text: "Текст заметки вапвап вапвап апвп"
    },
    {
      title: "Заголовок заметки",
      text: "Текст заметки вапвап вапвап апвп df dfg df "
    },
    {
      title: "Заголовок заметки",
      text: "Текст заметки вапвап вапвап апвп"
    },
    {
      title: "Заголовок заметки",
      text: "Текст заметки вапвап вапвап апвп"
    },
  ]
  return (
    <div className="notes-editor">
        <div className="notes-editor__left">
          <div className="notes-editor__button-container">
            <Button type="button" label="Заметка" icon=""/>
          </div>
          <div className="notes-editor__list-container">
            <NotesList list={list} />
          </div>
        </div>
        <div className="notes-editor__right">
          <Note title={list[0].title} text={list[0].text}/>
        </div>
    </div>
  );
};

export default NotesEditor;
