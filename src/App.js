import React, {Component} from 'react';
// import logo from './logo.svg';
import classes from './App.module.css';

import Login from './components/Login/Login';
import Layout from './hoc/Layout/Layout';
import UserProfile from './components/UserProfile/UserProfile';

class App extends Component {
  
  render() {
    return (
      <div className={classes.App}>
        <Layout>
          {/* <h2>This is the App</h2> */}
          <UserProfile />
          <Login />
        </Layout>
      </div>
    );
  }
}

export default App;
