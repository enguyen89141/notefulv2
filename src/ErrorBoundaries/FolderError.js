import React, {Component} from 'react';

export default class FolderError extends Component {
    state={
        hasError: false
    }
    static getDerivedStateFromError(error){
        return {hasError: true}
    }
    render(){
        if (this.state.hasError){
            return (
                <h2>Could not display this folder.</h2>
            );   
        }   
    return this.props.children;
    }
}
