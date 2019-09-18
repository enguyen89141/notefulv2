import React, { Component } from 'react'
import ApiContext from '../ApiContext'

export default class AddFolder extends Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        }
    }
    static contextType = ApiContext
    render() {
        return (
           <div className="AddFolderNav">
               <button
                    className="AddFolderNav__back-button"
                    onClick={() => this.props.history.goBack()}
                >
                    Go Back
                </button>
           </div>
        )
    }
}
