import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import './NoteListMain.css'
import Note from '../Note/Note'
import { NavLink } from 'react-router-dom'
import NoteError from '../ErrorBoundaries/NoteError'





export default class NoteListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    render() {
        return (
            <ApiContext.Consumer>
                {(value) => {
                    const notesForFolder = (!this.props.match.params.folderId)
                        ? value.notes
                        : value.notes.filter(note =>
                            note.folder === parseInt(this.props.match.params.folderId))
                    return (
                        <section className="NoteListMain">
                            <ul>
                                <NoteError>
                                    {notesForFolder.map(note =>
                                        <li key={note.id}>
                                            <Note
                                                id={note.id}
                                                name={note.name}
                                                date_created={note.date_created}
                                                history={this.props.history}
                                            />
                                        </li>)}
                                </NoteError>
                            </ul>
                            <div className="NoteListMain__button-container">
                                <button>
                                    <NavLink
                                        to={`/add-note`}
                                    >Add Note
                                    </NavLink>
                                </button>
                            </div>
                        </section>
                    )
                }}
            </ApiContext.Consumer>
        )
    }
}