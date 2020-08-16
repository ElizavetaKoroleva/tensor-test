import React from 'react';
import { INoteItem } from '../../types';
import Button from '../Button/Button';
import NotesList from '../NotesList/NotesList';
import Note from '../Note/Note';
import SearchForm from '../SearchForm/SearchForm';
import Sorting from '../Sorting/Sorting';
import TextModal from '../TextModal/TextModal';
import DeleteModal from '../DeleteModal/DeleteModal';

const NotesEditor: React.FC = () => {
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
  const [isEditable, setIsEditable] = React.useState(false); 
  const [currentNote, setCurrentNote] = React.useState(emptyNote);
  const [isTextModalHidden, setisTextModalHidden] = React.useState(true);
  const [isDeleteModalHidden, setIsDeleteModalHidden] = React.useState(true);
  const [noteToDelete, setNoteToDelete] = React.useState('');

  const getNotes = () => {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  };

  const [notesList, setNotesList] = React.useState(getNotes());

  const setNotes = (list: INoteItem[], note?: INoteItem) => {
    note ? 
    localStorage.setItem("notes", JSON.stringify([...list, note]))
    :
    localStorage.setItem("notes", JSON.stringify([...list]));
  };

  const getNoteInfo = (id: string, title: string, text: string, date: Date) => {
    if (isEditable) {
      openModal("textModal");
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

  const createNote = () => {
    if (isEditable) {
      openModal("textModal");
    } else {
      const id = `note_${(~~(Math.random()*1e8)).toString(16)}`;
      const list = getNotes();

      const newNote = {
        id,
        title:  `Заголовок заметки ${notesList.length + 1}`,
        text: `Текст заметки ${notesList.length + 1}`,
        date: new Date(),
        active: true
      };

      (document.getElementById("search-input") as HTMLInputElement).value = "";
      setNotes(list, newNote);

      setCurrentNote(newNote);

      setIsEditable(true);
      if (activeOption === "desc") {
        setNotesList([newNote, ...list]);
      } else {
        setNotesList([...list, newNote]);
      }
    }
  };

  const deleteNote = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    if (isEditable) {
      openModal("textModal");
    } else {
      setNoteToDelete(id);
      openModal("deleteModal");
    }
  };

  const confirmDeletion = (agreement: boolean) => {
    setIsDeleteModalHidden(true);

    if (agreement) {
      const currentList = getNotes();
      const noteIndex = currentList.findIndex((item: INoteItem) => item.id === noteToDelete);
      currentList.splice(noteIndex, 1);
      const currentIndex = notesList.findIndex((item: INoteItem) => item.id === noteToDelete);
      notesList.splice(currentIndex, 1);
      setNotesList([...notesList]);
      setNotes(currentList);
  
      if (noteToDelete === currentNote.id) {
        setCurrentNote(emptyNote);
      }
    }
  };

  const sortByDate = (method: string) => {
    if (method === "asc") {
      const sortedList = notesList.sort((a: INoteItem, b: INoteItem) => {
        return Number(new Date(a.date)) - Number(new Date(b.date));
      });

      setNotesList([...sortedList]);
    } else {
      const sortedList = notesList.sort((a: INoteItem, b: INoteItem) => {
        return Number(new Date(b.date)) - Number(new Date(a.date));
      })

      setNotesList([...sortedList]);
    }
  };

  const handleInput = (e: any) => {
    let list = getNotes();
    list = list.filter((item: INoteItem) => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setNotesList([...list]);
  };

  const sortNotes = (value: string) => {
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
  };

  const saveNote = (id: string, title: string, text: string) => {
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

    setNotes(notesList, newNote);
    setIsEditable(false);
  };

  const openModal = (modal: string) => {
    if (modal === "deleteModal") {
      setIsDeleteModalHidden(false);
    } else {
      setisTextModalHidden(false);
    }
  };

  const closeModal = (hidden: boolean) => {
    setisTextModalHidden(hidden);
  };

  const closeDeleteModal = (hidden: boolean) => {
    setIsDeleteModalHidden(hidden);
  };

  React.useEffect(() => {
    sortByDate(activeOption);
  }, [])

  return (
    <div className="notes-editor">
        <div className="notes-editor__left">
          <div className="notes-editor__button-container">
            <Button type="button" 
                    label="Заметка" 
                    text="Заметка"
                    icon="/plus.svg" 
                    onClick={createNote}
            />
          </div>
          <div className="notes-list__search-form">
            <SearchForm placeholder="Поиск..." handleInput={handleInput}/>
          </div>
          <div className="notes-list__sorting">
            <Sorting options={options} 
                     changeSortingOption={sortNotes} 
                     activeOption={activeOption} />
          </div>
          <div className="notes-editor__list-container">
            {notesList && notesList.length ? 
              <NotesList list={notesList} 
                         onClick={getNoteInfo} 
                         onDelete={deleteNote}
                         activeNote={currentNote.id} />
              :
              <div className="notes-editor__">
                Список заметок пуст
              </div>
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
        <TextModal text="Пожалуйста, сохраните текущую заметку." 
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
