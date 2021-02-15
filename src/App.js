import React, {Component} from 'react';
// import logo from './logo.svg';
import classes from './App.module.css';

import Login from './components/Login/Login';

class App extends Component {
  
  render() {
    return (
      <div className={classes.App}>
        <h2>This is the App</h2>
        <Login />
      </div>
    );
  }
}

export default App;
