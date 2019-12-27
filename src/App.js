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
import Courses from './screens/courses';
import Resume from './screens/resume';
import Admin from './screens/admin';
import Edit from './screens/edit';
import NavHeader from './components/navheader';
import { PrivateRoute } from './components/privateroute';
import fb from './firebase';
import './App.css';

class App extends Component {

  componentDidMount() {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user is logged in');
      } else {
        console.log('user is not logged in');
      }
    });
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="site_container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/experience/" component={Experience} />
            <Route path="/projects/" component={Projects} />
            <Route path="/courses/" component={Courses} />
            <Route path="/contacts/" component={Contacts} />
            <Route path="/resume/" component={Resume} />
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