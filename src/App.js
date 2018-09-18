import React, { Component } from 'react';
import routes from './routes.js'
import {browserHistory, Router} from 'react-router';
import './static/style.css';


class App extends Component {
  render() {
    return (
          <Router history={browserHistory} routes={routes}/>
    );
  }
}

export default App;
