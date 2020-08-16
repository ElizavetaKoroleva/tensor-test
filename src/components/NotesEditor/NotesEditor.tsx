import React from 'react';
import { INoteItem } from '../../types';
import Button from '../Button/Button';
import NotesList from '../NotesList/NotesList';
import Note from '../Note/Note';
import SearchForm from '../SearchForm/SearchForm';
import Sorting from '../Sorting/Sorting';
import TextModal from '../TextModal/TextModal';
import DeleteModal from '../DeleteModal/DeleteModal';

const NotesEditor: React.SFC = () => {
  const options = [
    {
      value: "desc",
      text: "убыванию даты",
    },
    {
        value: "asc",
        text: "возрастанию даты",
    },
  ];
  const emptyNote = {
    id: '',
    title: '',
    text: '',
    active: false,
    date: new Date(),
  };

  const [activeOption, setActiveOption] = React.useState("desc");
  const [notesList, setNotesList] = React.useState(
    JSON.parse(localStorage.getItem('notes') 
    || '[{"id": "", "title": "", "text": "", "date": "2020-08-16T12:10:31.074Z", "active": "false"}]')
  );
  const [isEditable, setIsEditable] = React.useState(false); 
  const [currentNote, setCurrentNote] = React.useState(emptyNote);
  const [initialContent, setInitialContent] = React.useState({title: '', text: ''});
  const [isModalHidden, setisModalHidden] = React.useState(true);
  const [isDeleteModalHidden, setisDeleteModalHidden] = React.useState(true);
  const [agreement, setAgreement] = React.useState(false);

  const getNoteInfo = (id: string, title: string, text: string, date: Date) => {
    // if (isEditable) {
    //   setisModalHidden(false);
    // } else {
      setCurrentNote({
        id,
        title,
        text,
        date,
        active: true
      });
    // }
  };

  const createNote = () => {
    // if (isEditable) {
    //   setisModalHidden(false);
    // } else {
    const id = `note_${(~~(Math.random()*1e8)).toString(16)}`;

    const note = {
      id,
      title: 'Заголовок заметки',
      text: 'Текст',
      date: new Date(),
      active: true
    };

    //   localStorage.setItem(id, JSON.stringify(note));

      // if (activeOption === "desc") {
      //   initialList.unshift(note);
      // } else {
      //   initialList.push(note);
      // }

      //await setCurrentNote(note);
      
      // setInitialContent({
      //   title: 'Заголовок заметки',
      //   text: 'Текст'
      // });
      //setIsEditable(true);
      //getNotesList();
      if (activeOption === "desc") {
        setNotesList([note, ...notesList]);
      } else {
        setNotesList([...notesList, note]);
      }
      localStorage.setItem("notes", JSON.stringify([...notesList, note]));
    //}
  };

  const deleteNote = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const noteIndex = notesList.findIndex((item: INoteItem) => item.id === id);
    notesList.splice(noteIndex, 1);
    setNotesList([...notesList]);
    localStorage.setItem("notes", JSON.stringify(notesList));

    if (id === currentNote.id) {
      setCurrentNote({
        id: '',
        title: '',
        text: '',
        date: new Date(),
        active: false
      });
    }
  };

  const sortByDate = (method: string) => {
    if (method === "asc") {
      const sortedList = notesList.sort((a: INoteItem, b: INoteItem) => {
        return +new Date(a.date) - +new Date(b.date);
      });
      setNotesList([...sortedList]);
    } else {
      const sortedList = notesList.sort((a: INoteItem, b: INoteItem) => {
        return +new Date(b.date) - +new Date(a.date);
      })
      setNotesList([...sortedList]);
    }
  };

  const handleInput = (e: any) => {
    const notesCopy = JSON.parse(localStorage.getItem("notes") || "[]");
    const list = notesCopy.filter((item: INoteItem) => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setNotesList([...list]);
  };

  const changeSortingOption = (value: string) => {
    setActiveOption(value);
    sortByDate(value);
  };

  const editNote = () => {
    setIsEditable(true);
    setInitialContent({
      title: currentNote.title,
      text: currentNote.text
    });
  };

  const cancelEditing = () => {
    // setCurrentNote({
    //   id: currentNote.id,
    //   title: initialContent.title,
    //   text: initialContent.text,
    //   active: currentNote.active,
    //   date: currentNote.date
    // });
    // setIsEditable(false);
  }

  const saveNote = async (id: string, title: string, text: string) => {
    const newNote = {
      id,
      title,
      text,
      date: new Date(),
      active: true,
    };
    const activeIndex = notesList.findIndex((item: INoteItem) => item.id === id);
    notesList.splice(activeIndex, 1);
    if (activeOption === "desc") {
      setNotesList([newNote, ...notesList]);
    } else {
      setNotesList([...notesList, newNote]);
    }
    localStorage.setItem("notes", JSON.stringify([...notesList, newNote]));
    

    setIsEditable(false);
  };

  const confirmDeletion = (agreement: boolean) => {
    //setAgreement(agreement);
  };

  React.useEffect(() => {
    sortByDate(activeOption);
  }, [])

  return (
    <div className="notes-editor">
        <div className="notes-editor__left">
          <div className="notes-editor__button-container">
            <Button type="button" label="Заметка" icon="/plus.svg" onClick={createNote}/>
          </div>
          <div className="notes-list__search-form">
            <SearchForm placeholder="Поиск..." handleInput={handleInput}/>
          </div>
          <div className="notes-list__sorting">
            <Sorting options={options} 
                     changeSortingOption={changeSortingOption} 
                     activeOption={activeOption} />
          </div>
          <div className="notes-editor__list-container">
            {notesList && notesList.length ? 
              <NotesList list={notesList} 
                         onClick={getNoteInfo} 
                         onDelete={deleteNote}
                         activeNote={currentNote.id} />
              :
              <div className="notes-editor__">Список заметок пуст</div>
            }
          </div>
        </div>
        <div className="notes-editor__right">
          {currentNote && currentNote.id &&
            <Note id={currentNote.id}
                  title={currentNote.title} 
                  text={currentNote.text}
                  onEdit={editNote}
                  onDelete={() => deleteNote(currentNote.id)} 
                  onCancel={cancelEditing}
                  onSave={saveNote}
                  isEditable={isEditable} />
          }
        </div>
    </div>
  );
};

export default NotesEditor;
