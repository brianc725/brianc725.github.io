import React, { Component } from 'react';
import {
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Spinner } from 'reactstrap';
import Home from './screens/home';
import Experience from './screens/experience';
import Projects from './screens/projects';
import Contacts from './screens/contacts';
import Courses from './screens/courses';
import Awards from './screens/awards';
import Resume from './screens/resume';
import Admin from './screens/admin';
import Edit from './screens/edit';
import NavHeader from './components/navheader';
import { PrivateRoute } from './components/privateroute';
import fb from './firebase';
import { sortPriority, sortAlpha } from './scripts/strings';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awardsData: undefined,
      socialsData: undefined,
      isLoading: true,
    }
  }

  async componentDidMount() {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log('user is logged in');
      }
    });

    let awardsData = [];
    let socialsData = [];
    await fb.awardsRef.get()
      .then(snapshot => {
        let items = [];
        snapshot.forEach(doc => {
          let item = {
            id: doc.id,
            data: doc.data(),
          }
          items.push(item);
        });
        let sorted = sortPriority(items);
        awardsData = sorted;
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        awardsData = undefined;
      });

    await fb.socialsRef.get()
    .then(snapshot => {
      let items = [];
      snapshot.forEach(doc => {
        let item = {
          id: doc.id,
          data: doc.data(),
        }
        items.push(item);
      });
      let sorted = sortAlpha(items);
      socialsData = sorted;
    }).catch(err => {
      // save error to a state
      console.error('Error getting documents', err);
      socialsData = undefined;
    });

    this.setState({
      awardsData,
      socialsData,
      isLoading: false,
    });
  }

  render() {
    return (
      <div>
        <NavHeader />
        {
          this.state.isLoading
            ?
            <div>
              <Spinner color="primary" className="spinner-center" />
            </div>
            :
            <div className="site_container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/experience/" component={() => <Experience fbRef={fb.experienceRef} />} />
                <Route path="/projects/" component={Projects} />
                <Route path="/courses/" component={Courses} />
                <Route path="/clubs/" component={() => <Experience fbRef={fb.clubsRef} />} />
                <Route path="/awards/" render={() => <Awards awardsData={this.state.awardsData} />} />
                <Route path="/contacts/" render={() => <Contacts socialsData={this.state.socialsData}/>} />
                <Route path="/resume/" component={Resume} />
                {/* Admin portal */}
                <Route path="/admin/" exact component={Admin} />
                <PrivateRoute path='/admin-edit' component={Edit} />
                {/* 404 redirect to Home */}
                <Redirect to="/" />
              </Switch>
            </div>
        }
      </div>
    );
  }
}

export default App;