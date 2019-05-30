import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';
import './App.scss';
import { LoginComponent } from './componenets/LoginComponent';
import RegisterComponent from './componenets/RegisterComponent';
import { history } from './helpers/history'
import { HomeComponent } from './componenets/HomeComponent';
import { store } from './store';
import { loginFromStorageAction } from './actions/access.actions';
import { NewIssueComponent } from './componenets/NewIssueComponent';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class Guard {
  shouldRoute() {
    let state = store.getState().accessReducer;
    return state != null && state.token != null && state.username != null;
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    if (token != null && username != null) {
      this.props.dispatch(loginFromStorageAction(token,username));
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/register" exact component={RegisterComponent} />
          <SecureRoute path="/home" exact component={HomeComponent} routeGuard={new Guard()} />
          <SecureRoute path="/new-issue" exact component={NewIssueComponent} routeGuard={new Guard()} />
          <Route exact path="/" render={() => (<Redirect to="/login" />)} />
        </Switch>
      </Router>
    );
  }
  componentDidMount() {
    document.body.style.fontFamily = 'Comic Sans, SansSerif;';
  }
}

function mapStateToProps(state) {
  const { loggingIn, loggedIn, token, username } = state;
  return { loggingIn: loggingIn, loggedIn: loggedIn, token: token, username: username }
}

export default connect(mapStateToProps)(App);
