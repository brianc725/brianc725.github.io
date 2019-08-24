import React, { Component } from 'react';
import {
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from './screens/home';
import Experience from './screens/experience';
import Projects from './screens/projects';
import Contacts from './screens/contacts';
import Admin from './screens/admin';
import Edit from './screens/edit';
import NavHeader from './components/navheader';
import { PrivateRoute } from './components/privateroute';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavHeader />
        <div className="site_container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/experience/" component={Experience} />
            <Route path="/projects/" component={Projects} />
            <Route path="/contacts/" component={Contacts} />
            {/* Admin portal */}
            <Route path="/admin/" exact component={Admin} />
            <PrivateRoute path='/admin-edit' component={Edit} />
            {/* 404 redirect to Home */}
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;