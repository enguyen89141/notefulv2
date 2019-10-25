import React, { Component } from 'react'
import './AddFolderMain.css'
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types'

export default class AddFolderMain extends Component {

    static contextType = ApiContext
    state = {
        value: ''
    }
    handleChange(e) {
        this.setState({ value: e.target.value })
    }
    validateName(fieldValue) {
        const folderName = this.state.value.trim();
        if (folderName.length === 0) {
            return 'Folder name cannot be empty';
        } else if (folderName.length > 15) {
            return 'Folder name cannot be more than 15 characters';
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:8000/api/folders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ folder_name: this.state.value })
        })
            .then(response => response.json())
            .then(data =>{
                this.context.addFolder(data)
            }) 
            .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="AddFolder"
            >
                <h2>Create a folder</h2>
                <form
                    onSubmit={e => this.handleSubmit(e)}
                    className="Noteful-form">
                    <div className="field">
                        <label htmlFor="folder-name-input">Name</label>
                        <input
                            type="text"
                            id="folder-name-input"
                            value={this.state.value}
                            onChange={e => this.handleChange(e)} />
                        <ValidationError message={this.validateName()} />
                    </div>
                    <button 
                        disabled={this.validateName()}
                        type='submit'>Add Folder</button>
                </form>

            </section>
        )
    }
}


AddFolderMain.propTypes = {
    value: PropTypes.string.isRequired
}