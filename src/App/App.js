import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import ApiContext from '../ApiContext'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import AddFolderNav from '../AddFolderNav/AddFolderNav'
import AddFolderMain from '../AddFolderMain/AddFolderMain'
import AddNoteMain from '../AddNoteMain/AddNoteMain'


export default class App extends Component {
  state = {
    notes: [],
    folders: [],
    folderName: {
      value: ""
    }
  }
  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(response => {
        if (!response.ok) {
          console.log('Error during folder data retrieval')
          throw new Error('There was an issue obtaining the folders from the server')
        }
        return response;
      })
      .then(response => response.json())
      .then(folders => {
        this.setState({
          folders: folders
        })
      })
    fetch('http://localhost:9090/notes')
      .then(response => {
        if (!response.ok) {
          console.log('Error during note data retrieval')
          throw new Error('There was an issue obtaining the notes from the server')
        }
        return response;
      })
      .then(response => response.json())
      .then(notes => {
        this.setState({
          notes: notes
        })
      })
  }
  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };
  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }
  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }
  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={AddFolderNav} />
        <Route path="/add-note" component={AddFolderNav} />
      </>
    )
  }
  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolderMain} />
        <Route path="/add-note" component={AddNoteMain} />
      </>
    )
  }
  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };
  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    }
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    )
  }
}

