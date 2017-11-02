import React from 'react';

export default class Message extends React.Component {
    render(){
        return (
            <p className="alert alert-success">{this.props.text}</p>
        );
    }
}
