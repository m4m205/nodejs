import React from 'react';
import Login from './login';
import Register from './register'

export default class Main extends React.Component {
    render(){
        return (
            <div>            
                <Login />
                <Register />
            </div>
        );
    }
}
