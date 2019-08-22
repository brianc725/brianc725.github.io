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
import NavFooter from './components/navfooter';
import firebase from './firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    // Set up listener
    firebase.auth().onAuthStateChanged((user) => {
      user
        ?
        this.setState(() => ({
          loggedIn: true,
        }))
        :
        this.setState(() => ({
          loggedIn: false,
        }));
    });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        <NavHeader/>
        <div className="site_container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/experience/" component={Experience} />
              <Route path="/projects/" component={Projects} />
              <Route path="/contacts/" component={Contacts} />
              {/* Admin portal */}
              <Route path="/admin/" exact render={() => <Admin loggedIn={loggedIn}/>} />
              {
                loggedIn
                  ?
                  <Route path="/admin-edit/" exact component={Edit} />
                  :
                  <Route path="/" exact component={Home} />
              }
              {/* 404 redirect to Home */}
              <Redirect to="/" />
            </Switch>
        </div>
        <NavFooter loggedIn={loggedIn}/>
      </div>
    );
  }
}

export default App;