import React, {Component} from 'react';
import classes from './App.module.css';
import {Redirect, Route, Switch} from 'react-router';
import {connect} from 'react-redux';

import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Layout from './hoc/Layout/Layout';
// import UserProfile from './components/UserProfile/UserProfile';
import Toplist from './containers/Toplist/Toplist';

class App extends Component {
  
  render() {

    let routes = null;
    if(!this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/auth" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Redirect to="/auth" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          {/* <Route path="/auth" exact component={Logout} /> */}
          <Route path="/auth" exact render={()=><div>logout</div>} />
          {/* <Route path="/" exact component={Logout} /> */}
          <Route path="/practice" exact render={()=><div>practice</div>} />
          <Route path="/profile" exact render={()=><div>profile</div>} />
          <Route path="/" exact render={()=><div>Main Page</div>} />
          <Redirect to="/" />
        </Switch>
      )      
    }

    return (
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
