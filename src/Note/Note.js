import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import './Note.css'
import ApiContext from '../ApiContext'

export default class Note extends Component{

    static contextType = ApiContext
    render(){
        const { name, id, modified } = this.props
        return(
            <div className="Note">
                <h2 className="Note__title">
                    <Link to={`/note/${id}`}>
                        {name}
                        </Link>
                </h2>
                <button
                      type='button'
                      className='Note__delete'
                      onClick={e => {
                        e.preventDefault()
                        const noteId = id
                        fetch(`http://localhost:9090/notes/${noteId}`,{
                          method: 'DELETE',
                          headers: {
                            'content-type': 'application/json'
                          },
                        })
                        .then(() => {
                          this.context.deleteNote(noteId)
                          this.props.onDeleteNote(noteId)
                        })
                        .catch(error => {
                          console.error({ error })
                        })
                      }}
                    >
                      Delete
                                </button>
                <div className="Notes__dates">
                    <div className="Notes__dates-modified">
                        Modified
                        {' '}
                        <span className="Date">
                            <Moment format="MM/DD/YYYY">
                                {modified}
                            </Moment>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}