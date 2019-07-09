import React, { Component } from "react";
import config from "../config";
import ApiContext from "../ApiContext";
import "./AddNote.css";
import ValidationError from "../ValidationError";
import PropTypes from "prop-types";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      },
      content: "",
      modified: "",
      folderId: {
        value: null,
        touched: false
      }
    };
  }
  static contextType = ApiContext;
  static defaultProps = {
    folders: []
  };

  updateName = name => {
    this.setState({ name: { value: name, touched: true } });
  };

  updateContent = content => {
    this.setState({ content: content });
  };

  updateModifiedDate = () => {
    const date = new Date();
    return date;
  };

  updateFolderId = id => {
    this.setState({ folderId: { value: id, touched: true } });
  };

  validateNoteName = fieldValue => {
    const title = this.state.name.value.trim();
    if (title.length === 0) {
      return "Title is required";
    } else if (title.length < 4 || title.length > 20) {
      return "Title must be between 4 and 15 characters long";
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, content, folder } = event.target;
    const note = {
      name: name.value,
      content: content.value,
      modified: this.updateModifiedDate(),
      folderId: folder.value
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "post",
      body: JSON.stringify(note),
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(note => {
        this.context.addNote(note);
        this.props.history.goBack();
      });
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={event => this.handleSubmit(event)}>
          <div className="note-title-container">
            <label htmlFor="name">Enter Title:</label>
            <input
              type="text"
              name="name"
              onChange={e => this.updateName(e.target.value)}
              minLength="4"
              maxLength="215"
              defaultValue="Untitled Note"
              placeholder="Enter note title"
              required
            />
            {this.state.name.touched && (
              <ValidationError message={this.validateNoteName()} />
            )}
          </div>
          <div className="content-container">
            <label className="content-label" htmlFor="note content title">
              Enter Content:{" "}
            </label>
            <textarea
              defaultValue="Enter content"
              name="content"
              rows="8"
              cols="70"
              wrap="hard"
              onChange={e => this.updateContent(e.target.value)}
              placeholder="Enter Content"
              required
              aria-required="true"
              aria-describedby="mustEnterContent"
            />
          </div>
          <p id="mustEnterContent">Note content entry required</p>
          <div className="folder-select-container">
            <label htmlFor="folder selection">Select folder</label>
            <select
              name="folder"
              onChange={event => this.updateFolderId(event.target.value)}
              required
              aria-required="true"
              aria-describedby="mustSelectFolder"
            >
              <option value={null}>Select Folder</option>
              {this.context.folders.map(folder => (
                <option value={folder.id} name="folder" key={folder.name}>
                  {folder.name}
                </option>
              ))}
            </select>
            <p id="mustSelectFolder">Folder selection required</p>
          </div>
          <button type="submit" disabled={!this.state.folderId.touched}>
            Submit
          </button>
        </form>
        <button onClick={this.props.history.goBack}>Return</button>
      </div>
    );
  }
}
AddNote.defaultProps = {
  history: {
    goBack: () => {}
  }
};
AddNote.propTypes = {
  folders: PropTypes.array
};
