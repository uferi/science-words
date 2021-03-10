import React, {Component} from 'react';
import classes from './App.module.css';
import {Redirect, Route, Switch} from 'react-router';
import {connect} from 'react-redux';

import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Layout from './hoc/Layout/Layout';
import MainPage from './containers/MainPage/MainPage';
import PracticePage from './containers/PracticePage/PracticePage';

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
          {/* <Route path="/practice" exact render={()=><div>practice</div>} /> */}
          <Route path="/practice" exact component={PracticePage} />
          <Route path="/profile" exact render={()=><div>profile</div>} />
          <Route path="/" exact component={MainPage} />
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
    isAuthenticated: state.auth.isAuthenticated,
    userProfiles: state.stat.userProfiles
  }
}

export default connect(mapStateToProps)(App);
