import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import './Note.css'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'

export default class Note extends Component{

    static contextType = ApiContext
    render(){
        const { name, id, date_created } = this.props
        return(
            <div className="Note">
                <h2 className="Note__title">
                    <Link to={`/api/notes/${id}`}>
                        {name}
                        </Link>
                </h2>
                <button
                      type='button'
                      className='Note__delete'
                      onClick={e => {
                        e.preventDefault()
                        const noteId = id
                        fetch(`https://thawing-ridge-22316.herokuapp.com/api/notes/${noteId}`,{
                          method: 'DELETE',
                          headers: {
                            'content-type': 'application/json'
                          },
                        })
                        .then(() => {
                          this.props.history.push('/')
                          this.context.deleteNote(noteId)
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
                        Created
                        {' '}
                        <span className="Date">
                            <Moment format="MM/DD/YYYY">
                                {date_created}
                            </Moment>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

Note.propTypes = {
  value: PropTypes.string
}