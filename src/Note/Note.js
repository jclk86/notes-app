import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ApiContext from "../ApiContext";
import { format } from "date-fns";
import config from "../config";
import "./Note.css";
import PropTypes from "prop-types";

export default class Note extends Component {
  // static defaultProps = {
  //   onDeleteNote: () => {}
  // };
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      // you're fetching from this end point, hence notes
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        // allow parent to perform extra behaviour
        // this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    return (
      <li className="note clearfix">
        <h2>
          <NavLink to={`/note/${this.props.id}`}> {this.props.name}</NavLink>
        </h2>
        <p>Modified: {format(this.props.modified, "Do MMM YYYY")}</p>
        <button type="button" onClick={this.handleClickDelete}>
          DELETE
        </button>
      </li>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string,
  modified: PropTypes.string,
  name: PropTypes.string,
  deleteNote: PropTypes.func
};
