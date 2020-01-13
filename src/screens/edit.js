import React, { Component } from 'react';
import {
  Form,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import classnames from 'classnames';
import ExperienceForm from '../components/ExperienceForm';
import SocialsForm from '../components/SocialsForm';
import ResumeForm from '../components/ResumeForm';
import AwardsForm from '../components/AwardsForm';
import fb from '../firebase';
import '../App.css'
import { sortPriority, sortAlpha } from '../scripts/strings';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      experienceData: undefined,
      socialsData: undefined,
      coursesData: undefined,
      clubsData: undefined,
      awardsData: undefined,
    };
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

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onSubmit = (event) => {
    fb.handleSignOut().then(() => {
      console.log('Successfully logged out');
      this.props.history.push('/');
    }).catch((error) => {
      console.error('Sign out error: ', error);
    });
    event.preventDefault();
  }

  render() {
    let experienceDBForm =
      this.state.experienceData
        ?
        this.state.experienceData.map((item) =>
          <ExperienceForm key={item.id} item={item} fbRef={fb.experienceRef} />
        )
        :
        <div>
          <Button onClick={this.getExperienceData}>Load Experience Stored Data</Button>
        </div>

    let socialsDBForm =
      this.state.socialsData
        ?
        this.state.socialsData.map((item) =>
          <SocialsForm key={item.id} item={item} />
        )
        :
        <div>
          <Button onClick={this.getSocialsData}>Load Socials Stored Data</Button>
        </div>

    let clubsDBForm =
      this.state.clubsData
        ?
        this.state.clubsData.map((item) =>
          <ExperienceForm key={item.id} item={item} fbRef={fb.clubsRef} />
        )
        :
        <div>
          <Button onClick={this.getExperienceData}>Load Clubs Stored Data</Button>
        </div>

    let awardsDBForm = this.state.awardsData
      ?
      this.state.awardsData.map((item) =>
        <AwardsForm key={item.id} item={item} />
      )
      :
      <div>
        <Button onClick={this.getAwardsData}>Load Awards Stored Data</Button>
      </div>

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Home
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Experience
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Projects
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              Extracurriculars
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '6' })}
              onClick={() => { this.toggle('6'); }}
            >
              Skills
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '7' })}
              onClick={() => { this.toggle('7'); }}
            >
              Resume
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '8' })}
              onClick={() => { this.toggle('8'); }}
            >
              Socials
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '9' })}
              onClick={() => { this.toggle('9'); }}
            >
              Awards
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '10' })}
              onClick={() => { this.toggle('10'); }}
            >
              Sign Out
          </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <h1>Home Edit</h1>
          </TabPane>
          <TabPane tabId="2">
            <div>
              {/* The stuff from the DB that you can either update or delete */}
              {experienceDBForm}
              {/* New form if you want to add something new */}
              <ExperienceForm addition={true} fbRef={fb.experienceRef} />
            </div>
          </TabPane>
          <TabPane tabId="3">
            <h1>Projects edit</h1>
          </TabPane>
          <TabPane tabId="5">
            {clubsDBForm}
            <ExperienceForm addition={true} fbRef={fb.clubsRef} />
          </TabPane>
          <TabPane tabId="6">
            <h1>Skills edit</h1>
          </TabPane>
          <TabPane tabId="7">
            <div>
              <ResumeForm />
            </div>
          </TabPane>
          <TabPane tabId="8">
            <div>
              {/* The stuff from the DB that you can either update or delete */}
              {socialsDBForm}
              {/* New form if you want to add something new */}
              <SocialsForm addition={true} />
            </div>
          </TabPane>
          <TabPane tabId="9">
            {awardsDBForm}
            <AwardsForm addition={true} />
          </TabPane>
          <TabPane tabId="10">
            <Form>
              <Button onClick={this.onSubmit}>Sign Out</Button>
            </Form>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default Edit;