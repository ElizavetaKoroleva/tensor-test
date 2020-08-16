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
  const [isTextModalHidden, setisTextModalHidden] = React.useState(true);
  const [isDeleteModalHidden, setisDeleteModalHidden] = React.useState(true);
  const [noteToDelete, setNoteToDelete] = React.useState('');

  const getNoteInfo = (id: string, title: string, text: string, date: Date) => {
    if (isEditable) {
      openModal();
    } else {
      setCurrentNote({
        id,
        title,
        text,
        date,
        active: true
      });
    }
  };

  const createNote = async () => {
    if (isEditable) {
      openModal();
    } else {
      const id = `note_${(~~(Math.random()*1e8)).toString(16)}`;
      const list = JSON.parse(localStorage.getItem("notes") || "[]");

      const note = {
        id,
        title:  `Заголовок заметки ${notesList.length + 1}`,
        text: `Текст ${notesList.length + 1}`,
        date: new Date(),
        active: true
      };

      (document.getElementById("search-input") as HTMLInputElement).value = "";
      localStorage.setItem("notes", JSON.stringify([...list, note]));

      await setCurrentNote(note);
      setIsEditable(true);
      if (activeOption === "desc") {
        setNotesList([note, ...list]);
      } else {
        setNotesList([...list, note]);
      }
    }
  };

  const deleteNote = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    if (isEditable) {
      openModal();
    } else {
      setNoteToDelete(id);
      openDeleteModal();
    }
  };

  const confirmDeletion = (agreement: boolean) => {
    setisDeleteModalHidden(true);
    if (agreement) {
      const noteIndex = notesList.findIndex((item: INoteItem) => item.id === noteToDelete);
      notesList.splice(noteIndex, 1);
      setNotesList([...notesList]);
      localStorage.setItem("notes", JSON.stringify(notesList));
  
      if (noteToDelete === currentNote.id) {
        setCurrentNote({
          id: '',
          title: '',
          text: '',
          date: new Date(),
          active: false
        });
      }
    }
  }

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
  };

  const cancelEditing = (id: string, title: string, text: string, date: Date) => {
    setCurrentNote({
      id,
      title,
      text,
      active: true,
      date
    });
    setIsEditable(false);
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

  const openModal = () => {
    setisTextModalHidden(false);
  };

  const openDeleteModal = () => {
    setisDeleteModalHidden(false);
  };

  const closeModal = (hidden: boolean) => {
    setisTextModalHidden(hidden);
  };

  const closeDeleteModal = (hidden: boolean) => {
    setisDeleteModalHidden(hidden);
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
            {notesList && notesList.length && notesList[0].id ? 
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
                  onCancel={() => cancelEditing(
                    currentNote.id,
                    currentNote.title,
                    currentNote.text,
                    currentNote.date
                  )}
                  onSave={saveNote}
                  isEditable={isEditable} />
          }
        </div>
        <TextModal text="Пожалуйста сохраните текущую заметку" 
                   isHidden={isTextModalHidden}
                   closeModal={closeModal}
        />
        <DeleteModal text="Вы уверены, что хотите удалить заметку?" 
                     isHidden={isDeleteModalHidden} 
                     closeModal={closeDeleteModal} 
                     confirm={confirmDeletion} />
    </div>
  );
};

export default NotesEditor;
