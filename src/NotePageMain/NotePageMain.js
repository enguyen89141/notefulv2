import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import './NotePageMain.css'
import Note from '../Note/Note'
import { findNote } from '../notes-helper'

export default class NotePageMain extends Component {

    static contextType = ApiContext
    render() {
        const { notes = [] } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || { content: '' }
        return (
            <section className="NotePageMain">
                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                />
                <div className="NotePageMain__content">
                    {note.content}
                </div>
            </section>
        )
    }
}