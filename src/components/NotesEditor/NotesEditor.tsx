import React from 'react';
import Button from '../Button/Button';
import NotesList from '../NotesList/NotesList';
import Note from '../Note/Note';

const NotesEditor: React.SFC = () => {
  const initialList = [{
    id: '',
    title: '',
    text: '',
    date: new Date(),
  }];
  const [notesList, setNotesList] = React.useState(initialList);

  const [currentNote, setCurrentNote] = React.useState({
    id: '',
    title: '',
    text: '',
    date: new Date()
  });

  const getNoteInfo = (id: string, title: string, text: string, date: Date) => {
    setCurrentNote({
      id,
      title,
      text,
      date
    });
  };

  const createNote = () => {
    const id = `f${(~~(Math.random()*1e8)).toString(16)}`;
    const note = {
      id,
      title: 'Заголовок заметки',
      text: 'Текст',
      date: new Date(),
    };
    initialList.push(note);
    setNotesList(initialList);
    localStorage.setItem(id, JSON.stringify(note));
    setCurrentNote(note);
  }

  const deleteNote = (id: string) => {
    localStorage.removeItem(id);
    setCurrentNote({
      id: '',
      title: '',
      text: '',
      date: new Date()
    });
  };

  return (
    <div className="notes-editor">
        <div className="notes-editor__left">
          <div className="notes-editor__button-container">
            <Button type="button" label="Заметка" icon="" onClick={createNote}/>
          </div>
          <div className="notes-editor__list-container">
            {notesList.length ? 
              <NotesList list={notesList} onClick={getNoteInfo}/>
              :
              <div className="notes-editor__">Список заметок пуст</div>
            }
          </div>
        </div>
        <div className="notes-editor__right">
          {(currentNote.title || currentNote.text) && 
            <Note title={currentNote.title} text={currentNote.text}
                  onDelete={() => deleteNote(currentNote.id)} />
          }
        </div>
    </div>
  );
};

export default NotesEditor;
