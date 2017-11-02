import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home';
import LAR from './components/logIn_register';


ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={LAR} />
        <Route path='/register' component={LAR} />
        <Route path='/loggedIn' component={Home} />
      </div>
  </Router>,
  document.getElementById('root'))
