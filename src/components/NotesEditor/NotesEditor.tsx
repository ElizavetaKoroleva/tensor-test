import React, { useEffect } from 'react';
import Button from '../Button/Button';
import NotesList from '../NotesList/NotesList';
import Note from '../Note/Note';
import SearchForm from '../SearchForm/SearchForm';
import Sorting from '../Sorting/Sorting';

const NotesEditor: React.SFC = () => {
  let initialList = [{
    id: '',
    title: '',
    text: '',
    active: false,
    date: new Date(),
  }];
  const [notesList, setNotesList] = React.useState(initialList);
  const [activeNote, setActiveNote] = React.useState("");
  const [isEditable, setIsEditable] = React.useState(false); 

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
    if (method === "asc") {
      initialList = notesList.sort((a, b) => {
        return +new Date(a.date) - +new Date(b.date);
      });
      setNotesList(initialList.concat());
    } else {
      initialList = notesList.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      })
      setNotesList(initialList.concat());
    }
  };

  const handleInput = (e: any) => {
    const list = initialList.filter(item => item.title.includes(e.target.value));
    setNotesList(list);
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

  const editNote = (id: string, title: string, text: string) => {
    if (isEditable) {
      const newNote = {
        id,
        title,
        text,
        date: new Date(),
        active: true,
      }
      setIsEditable(false);
      localStorage.setItem(id, JSON.stringify(newNote));
    } else {
      setIsEditable(true);
    }
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
            <Note id={currentNote.id}
                  title={currentNote.title} 
                  text={currentNote.text}
                  onEdit={editNote}
                  onDelete={() => deleteNote(currentNote.id)} 
                  isEditable={isEditable} />
          }
        </div>
    </div>
  );
};

export default NotesEditor;
