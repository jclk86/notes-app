import React, { Component } from "react";
import "./App.css";
import { NavLink, Route, withRouter } from "react-router-dom";
import config from "./config";
import ApiContext from "./ApiContext";
import FolderListSide from "./FolderListSide/FolderListSide";
import NoteListMain from "./NoteListMain/NoteListMain";
import NoteContent from "./NoteContent/NoteContent";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) =>
        this.setState({ notes: notes, folders: folders })
      )
      .catch(error => console.error({ error }));
  }

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  addFolder = folder => {
    this.setState({ folders: [...this.state.folders, folder] });
  };

  addNote = note => {
    this.setState({ notes: [...this.state.notes, note] });
    console.log(this.state.notes);
  };
  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };
    return (
      <div className="App">
        <h1>
          <NavLink to="/">NOTES APP</NavLink>
        </h1>
        <ApiContext.Provider value={contextValue}>
          <div className="flex">
            <div className="side-nav">
              <ErrorBoundary>
                <Route exact path="/" key="/" component={FolderListSide} />
                <Route
                  exact
                  path="/folder/:folderId"
                  key="/folder/:folderId"
                  component={FolderListSide}
                />
                <Route exact path="/add-folder" component={AddFolder} />
              </ErrorBoundary>
            </div>
            <main>
              <ErrorBoundary>
                <Route exact path="/" key="/" component={NoteListMain} />
                <Route
                  exact
                  path="/folder/:folderId"
                  component={NoteListMain}
                />
                <Route exact path="/note/:noteId" component={NoteContent} />
                <Route exact path="/add-note" component={AddNote} />
              </ErrorBoundary>
            </main>
          </div>
        </ApiContext.Provider>
      </div>
    );
  }
}
export default withRouter(App);
