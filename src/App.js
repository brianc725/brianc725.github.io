import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch 
} from "react-router-dom";
import Home from './screens/home';
import Experience from './screens/experience';
import Projects from './screens/projects';
import Contacts from './screens/contacts';
import Admin from './screens/admin';
import NavHeader from './components/navheader';
import './App.css';

function App() {
  return (
    <div>
      <NavHeader />
      <div className="site_container">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/experience/" exact component={Experience} />
            <Route path="/projects/" exact component={Projects} />
            <Route path="/contacts/" exact component={Contacts} />
            {/* Admin portal */}
            <Route path="/admin/" exact component={Admin} />
            {/* 404 redirect to Home */}
            <Redirect to="/"/>
            </Switch>
        </Router>
      </div>
    </div>
        );
      }
      
      export default App;
