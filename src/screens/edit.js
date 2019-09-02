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
import fb from '../firebase';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      experienceData: undefined,
      socialsData: undefined,
    };
  }

  componentDidMount() {
    fb.experienceRef.get()
      .then(snapshot => {
        let items = [];
        snapshot.forEach(doc => {
          let item = {
            id: doc.id,
            data: doc.data(),
          }
          items.push(item);
        });
        this.setState({
          experienceData: items,
        })
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
      });

      fb.socialsRef.get()
      .then(snapshot => {
        let items = [];
        snapshot.forEach(doc => {
          let item = {
            id: doc.id,
            data: doc.data(),
          }
          items.push(item);
        });
        this.setState({
          socialsData: items,
        })
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
      });

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
          <ExperienceForm key={item.id} item={item} />
        )
        :
        <h2>Loading Experience Data...</h2>

    let socialsDBForm =
      this.state.socialsData
      ?
      this.state.socialsData.map((item) =>
        <SocialsForm key={item.id} item={item} />
      )
      :
      <h2>Loading Socials Data...</h2>

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
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Skills
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              Resume
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '6' })}
              onClick={() => { this.toggle('6'); }}
            >
              Socials
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '7' })}
              onClick={() => { this.toggle('7'); }}
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
              <ExperienceForm addition={true} />
            </div>
          </TabPane>
          <TabPane tabId="3">
            <h1>Projects edit</h1>
          </TabPane>
          <TabPane tabId="4">
            <h1>Skills edit</h1>
          </TabPane>
          <TabPane tabId="5">
            <h1>Resume edit</h1>
          </TabPane>
          <TabPane tabId="6">
          <div>
              {/* The stuff from the DB that you can either update or delete */}
              {socialsDBForm}
              {/* New form if you want to add something new */}
              <SocialsForm addition={true} />
            </div>
          </TabPane>
          <TabPane tabId="7">
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