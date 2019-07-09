import React, { Component } from "react";
import config from "../config";
import ApiContext from "../ApiContext";
import ValidationError from "../ValidationError";
import PropTypes from "prop-types";

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {
        title: "",
        touched: false
      }
    };
  }
  static contextType = ApiContext;

  updateFolderTitle = title => {
    this.setState({ folder: { title: title, touched: true } });
  };

  validateTitle = fieldValue => {
    const title = this.state.folder.title.trim();
    if (title.length === 0) {
      return "Title is required";
    } else if (title.length < 4 || title.length > 20) {
      return "Title must be between 4 and 20 characters long";
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title } = event.target;
    const folder = {
      name: title.value
    };
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(folder)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.goBack();
        this.setState({
          folder: {
            title: "",
            touched: false
          }
        });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label htmlFor="title">Add Folder: </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={e => this.updateFolderTitle(e.target.value)}
            defaultValue="Untitled Folder"
            minLength="4"
            maxLength="20"
            placeholder="Enter folder title"
            required
            aria-required="true"
            aria-describedby="folderTitleConstraints"
          />
          <p id="folderTitleConstraints" className="requiredField">
            (Title must be between 4 and 20 characters long)
          </p>
          {this.state.folder.touched && (
            <ValidationError message={this.validateTitle()} />
          )}

          <button type="submit">Submit</button>
        </form>
        <button onClick={this.props.history.goBack}>Return</button>
      </div>
    );
  }
}
AddFolder.defaultProps = {
  history: {
    goBack: () => {}
  }
};

AddFolder.propTypes = {
  addFolder: PropTypes.func
};
