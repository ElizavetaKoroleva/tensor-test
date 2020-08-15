import React from 'react';
import Button from '../Button/Button';
import NotesList from '../NotesList/NotesList';
import Note from '../Note/Note';
import SearchForm from '../SearchForm/SearchForm';
import Sorting from '../Sorting/Sorting';

const NotesEditor: React.SFC = () => {
  const initialList = [{
    id: '',
    title: '',
    text: '',
    active: false,
    date: new Date(),
  }];
  const [notesList, setNotesList] = React.useState(initialList);
  const [activeNote, setActiveNote] = React.useState("");

  const [currentNote, setCurrentNote] = React.useState({
    id: '',
    title: '',
    text: '',
    active: true,
    date: new Date()
  });

  const setInitialList = () => {
    initialList.length = 0;
    if (localStorage.length) {
      for (let i = 0; i < localStorage.length; i++) {
        const note = JSON.parse(localStorage.getItem(localStorage.key(i) || "") || "");
        { note &&
        initialList.push(note)
        }
      }
      //setNotesList(initialList);
    }
  };

  const getNoteInfo = (id: string, title: string, text: string, date: Date) => {
    setCurrentNote({
      id,
      title,
      text,
      date,
      active: true
    });
    setActiveNote(id);
  };

  const createNote = () => {
    const id = `f${(~~(Math.random()*1e8)).toString(16)}`;
    const note = {
      id,
      title: 'Заголовок заметки',
      text: 'Текст',
      date: new Date(),
      active: true
    };
    initialList.push(note);
    setNotesList(initialList);
    localStorage.setItem(id, JSON.stringify(note));
    setCurrentNote(note);
    setActiveNote(id);
  }

  const deleteNote = (id: string) => {
    localStorage.removeItem(id);
    setCurrentNote({
      id: '',
      title: '',
      text: '',
      date: new Date(),
      active: false
    });
  };

  const sortByDate = (method: string) => {
    if (method === "desc") {
      const sorted = notesList.sort((a, b) => {
        return +new Date(a.date) - +new Date(b.date);
      });
      setNotesList(sorted);
    } else {
      const sorted = notesList.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      })
      setNotesList(sorted);
    }
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
  }

  setInitialList();

  const options = [
    {
        value: "desc",
        text: "убыванию даты",
        active: true
    },
    {
        value: "asc",
        text: "возрастанию даты",
        active: false
    },
  ]

  const changeSortingOption = (value: string) => {
    sortByDate(value);
  };

  return (
    <div className="notes-editor">
        <div className="notes-editor__left">
          <div className="notes-editor__button-container">
            <Button type="button" label="Заметка" icon="" onClick={createNote}/>
          </div>
          <div className="notes-list__search-form">
            <SearchForm placeholder="Поиск..." handleInput={handleInput}/>
          </div>
          <div className="notes-list__sorting">
            <Sorting options={options} changeSortingOption={changeSortingOption} />
          </div>
          <div className="notes-editor__list-container">
            {notesList.length ? 
              <NotesList list={notesList} 
                         onClick={getNoteInfo} 
                         onDelete={deleteNote}
                         activeNote={activeNote} />
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
