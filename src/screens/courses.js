import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import fb from '../firebase';
import { sortAlpha } from '../scripts/strings';

const Course = (props) => {
  const { data } = props;
  return (<><h3>{data.name}</h3><h5>{data.desc}</h5><hr /></>);
}

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      currentCoursesData: undefined,
      completedCoursesData: undefined,
    };
  }

  componentDidMount() {
    fb.coursesRef.get()
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
        const currentCoursesData = [];
        const completedCoursesData = [];
        sorted.forEach(item => {
          if (item.data['current'] === '0') {
            completedCoursesData.push(item);
          } else {
            currentCoursesData.push(item);
          }
        })
        this.setState({
          currentCoursesData,
          completedCoursesData,
        });
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        this.setState({
          error: err,
        })
      });
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    if (!this.state.currentCoursesData && !this.state.completedCoursesData) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Completed Courses
                        </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Current Courses
                    </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {
              this.state.completedCoursesData.length !== 0
                ?
                this.state.completedCoursesData.map(item => <Course key={item.id} data={item.data} />)
                :
                'Something went wrong...'
            }
          </TabPane>
          <TabPane tabId="2">
            {
              this.state.currentCoursesData.length !== 0
                ?
                this.state.currentCoursesData.map(item => <Course key={item.id} data={item.data} />)
                :
                'There are no relevant classes that I am currently taking.'
            }
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Courses;