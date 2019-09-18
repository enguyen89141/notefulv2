import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ApiContext from '../ApiContext'
import './NoteListNav.css'
import FolderError from '../ErrorBoundaries/FolderError'

export default class NoteListNav extends Component {
    render() {
        return (
            <ApiContext.Consumer>
                {(value) => {
                    return (
                        <div className="NoteListNav">
                            <ul className="NoteListNav__list">
                                <FolderError>
                                    {value.folders.map(folder =>
                                        <li key={folder.id}>
                                            <NavLink
                                                className="NoteListNav__folder-link"
                                                to={`/folder/${folder.id}`}
                                            >
                                                {folder.name}
                                            </NavLink>
                                        </li>)}
                                </FolderError>
                            </ul>
                            <div className="NoteListNav__button-wrapper">
                                <button>
                                    <NavLink
                                        to={`/add-folder`}
                                    >Add folder
                                    </NavLink>
                                </button>
                            </div>
                        </div>

                    )

                }}

            </ApiContext.Consumer>
        )
    }
}