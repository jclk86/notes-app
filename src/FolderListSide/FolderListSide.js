import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { countNotesForFolders } from "../allFunctions";
import { NavLink } from "react-router-dom";
import "./FolderListSide.css";
import PropTypes from "prop-types";

export default class FolderListSide extends Component {
  static contextType = ApiContext;

  render() {
    return (
      <div className="folderList-container">
        <ul className="folderListSide">
          {this.context.folders.map(folder => (
            <li key={folder.id}>
              <NavLink
                to={`/folder/${folder.id}`}
                exact
                activeClassName="activeLink"
              >
                {folder.name}
                <p>{countNotesForFolders(this.context.notes, folder.id)}</p>
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink to="/add-folder">
          {" "}
          <button>Add Folder</button>
        </NavLink>
      </div>
    );
  }
}
FolderListSide.defaultProps = {
  folders: []
};

FolderListSide.propTypes = {
  folders: PropTypes.array,
  notes: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.string
};
