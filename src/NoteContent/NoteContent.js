import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { findNote } from "../allFunctions";
import PropTypes from "prop-types";

export default class NoteContent extends Component {
  static contextType = ApiContext;
  render() {
    const note = findNote(this.context.notes, this.props.match.params.noteId);

    return (
      <section>
        <h3>Title: {note.name}</h3>
        <div>
          {note.content.split(/\n \r|\n/).map((word, i) => (
            <p key={i}>{word}</p>
          ))}
        </div>
        <button onClick={this.props.history.goBack}>Go Back</button>
      </section>
    );
  }
}
NoteContent.defaultProps = {
  history: {
    goBack: () => {}
  }
};

NoteContent.propTypes = {
  notes: PropTypes.array,
  noteId: PropTypes.string,
  name: PropTypes.string
};
