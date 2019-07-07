import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../allFunctions";
import { NavLink } from "react-router-dom";
import "./NoteListMain.css";
import Note from "../Note/Note";
import PropTypes from "prop-types";

export default class NoteListMain extends Component {
  static defaultProps = {
    notes: []
  };
  static contextType = ApiContext;

  render() {
    const notesForFolder = getNotesForFolder(
      this.context.notes,
      this.props.match.params.folderId
    );
    return (
      <section>
        <ul>
          {notesForFolder.map(note => (
            <Note
              note={note}
              name={note.name}
              id={note.id}
              modified={note.modified}
              key={note.id}
            />
          ))}
        </ul>
        <NavLink to="/add-note">
          <button>Add Note</button>
        </NavLink>
      </section>
    );
  }
}
NoteListMain.defaultProps = {
  notes: []
};
NoteListMain.propTypes = {
  notes: PropTypes.array,
  folderId: PropTypes.string
};
