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
import Awards from './screens/awards';
import Resume from './screens/resume';
import Admin from './screens/admin';
import Edit from './screens/edit';
import NavHeader from './components/navheader';
import { PrivateRoute } from './components/privateroute';
import fb from './firebase';
import courseData from './courseData';
import { sortPriority, sortAlpha, stringToArr } from './scripts/strings';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awardsData: [],
      socialsData: [],
      currentCoursesData: [],
      completedCoursesData: [],
      clubsData: [],
      experienceData: [],
      projectsData: [],
    }
  }

  async componentDidMount() {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log('user is logged in');
      }
    });

    // TODO: Use github API /users endpoint to get the profile picture
  }

  getProjectsData = async () => {
    let projectsData = [];
    let filteredRepos = [];

    await fb.projectsRef.get()
      .then(snapshot => {
        let items = [];
        snapshot.forEach(doc => {
          let item = {
            id: doc.id,
            data: doc.data(),
          }
          items.push(item);
        });
        filteredRepos = items;
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        filteredRepos = undefined;
      });

    // if we cannot get the filtered repos then we should immediately end
    if (!filteredRepos) {
      projectsData = undefined;
    } else {
      const filteredStr = filteredRepos[0].data['repo_names'];
      // get the array of projects we want to display
      const filteredArr = stringToArr(filteredStr);
      await fetch('https://api.github.com/users/brianc725/repos')
        .then(data => data.json())
        .then(data => {
          // filter down the desired information
          projectsData = data.filter(i => filteredArr.includes(i.name));
        })
        .catch(err => {
          console.error('Error getting data', err);
          projectsData = undefined;
        })
    }

    this.setState({
      projectsData,
    })
  }

  // No longer using firebase due to amount of reads... Plus this data is
  // not going to change anymore after graduation.
  getCoursesData = async () => {
    let currentCoursesData = [];
    let completedCoursesData = [];

    let sorted = sortAlpha(courseData);
    sorted.forEach(item => {
      if (item.data['current'] === '0') {
        completedCoursesData.push(item);
      } else {
        currentCoursesData.push(item);
      }
    });

    this.setState({
      currentCoursesData,
      completedCoursesData,
    })
  }

  getExperienceData = async () => {
    let experienceData = [];

    await fb.experienceRef.get()
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
        experienceData = sorted;
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        experienceData = undefined;
      });

    this.setState({
      experienceData,
    })
  }

  getSocialsData = async () => {
    let socialsData = [];

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
      socialsData,
    })
  }

  getAwardsData = async () => {
    let awardsData = [];

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

    this.setState({
      awardsData,
    })
  }

  getClubsData = async () => {
    let clubsData = [];
    console.log('getting')
    await fb.clubsRef.get()
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
        clubsData = sorted;
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        clubsData = undefined;
      });

    this.setState({
      clubsData,
    })
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="site_container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/experience/"
              render={() =>
                <Experience
                  allData={this.state.experienceData}
                  getData={this.getExperienceData} />}
            />
            <Route path="/projects/" component={Projects} />
            <Route
              path="/courses/"
              render={() =>
                <Courses
                  getData={this.getCoursesData}
                  currentCoursesData={this.state.currentCoursesData}
                  completedCoursesData={this.state.completedCoursesData} />}
            />
            <Route
              path="/clubs/"
              render={() =>
                <Experience
                  allData={this.state.clubsData}
                  getData={this.getClubsData} />}
            />
            <Route
              path="/awards/"
              render={() =>
                <Awards
                  awardsData={this.state.awardsData}
                  getData={this.getAwardsData} />}
            />
            <Route
              path="/contacts/"
              render={() =>
                <Contacts
                  socialsData={this.state.socialsData}
                  getData={this.getSocialsData} />}
            />
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