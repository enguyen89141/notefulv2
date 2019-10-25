import React, { Component } from 'react'
import './NotePageNav.css'
import ApiContext from '../ApiContext'

import { findNote } from '../notes-helper'

export default class NotePageNav extends Component {

    static contextType = ApiContext
    render() {
        const { notes = [] } = this.context
        const { noteId } = this.props.match.params
        
        const note = findNote(notes, parseInt(noteId)) || { content: '' }
        const folder = this.context.folders.find(folder =>
            folder.id === note.folder)
        return (
            <div className="NotePageNav">
                {folder && (
                    <h3 className='NotePageNav__folder-name'>
                        {folder.folder_name}
                    </h3>
                )}
                <button
                    className="NotePageNav__back-button"
                    onClick={() => this.props.history.goBack()}
                >
                    Go Back
                </button>

            </div>
        )
    }
}