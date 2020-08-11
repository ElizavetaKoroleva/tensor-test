import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import NotesEditor from './components/NotesEditor/NotesEditor';

ReactDOM.render(
  <React.StrictMode>
    <NotesEditor />
  </React.StrictMode>,
  document.getElementById('root')
);
