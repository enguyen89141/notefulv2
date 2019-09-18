import React, { Component } from 'react'
import './AddNoteMain.css'
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError/ValidationError'

export default class AddNote extends Component {
    state = {
        name: '',
        content: '',
        selectedFolder: ''
    }
    static contextType = ApiContext
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    validateName(fieldValue) {
        const noteName = this.state.name.trim();
        if (noteName.length === 0) {
            return 'Note name cannot be empty';
        } else if (noteName.length > 15) {
            return 'Note name cannot be more than 15 characters';
        }
    }
    validateFolder(folderValue) {
        if (this.state.selectedFolder.length === 0){
            return 'Please select a folder from the dropdown list'
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.name,
                content: this.state.content,
                folder: this.state.selectedFolder
             })
        })
            .then(response => response.json())
            .then(data =>{

                this.props.history.push('/')
                this.context.addNote(data)
            }) 
            .catch(err => console.log(err))
    }
    render() {
        const folders = this.context.folders
        return (
            <section className="AddNote"
            >
                <h2>Create a note</h2>
                <form className="Noteful-form" onSubmit={e => this.handleSubmit(e)}>
                    <div className="field">
                        <label htmlFor="note-name-input">Name</label>
                        <input
                            type="text"
                            id="note-name-input"
                            name="name"
                            value={this.state.name}
                            onChange={e => this.handleChange(e)}
                        />
                        <ValidationError message={this.validateName()} />
                        <label htmlFor="note-content-input">Content</label>
                        <textarea
                            type="text"
                            id="note-content-input"
                            name="content"
                            value={this.state.content}
                            onChange={e => this.handleChange(e)}
                        />

                        <label htmlFor="note-folder-select">Folder</label>
                        <select
                            className="FolderOptions"
                            name="selectedFolder"
                            value={this.state.selectedFolder}
                            onChange={e => this.handleChange(e)
                            }>
                            <option></option>
                            {folders.map(folder =>
                                <option>{folder.name}</option>)}
                        </select>
                        <ValidationError message={this.validateFolder()} />
                        <button
                            type="submit"
                            disabled={
                                this.validateFolder() ||
                                this.validateName()
                            }>Add Note</button>
                    </div>
                </form>

            </section>
        )
    }
}