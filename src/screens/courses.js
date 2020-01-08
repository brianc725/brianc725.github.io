import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Alert,
} from 'reactstrap';
import classnames from 'classnames';

const Course = (props) => {
  const { data } = props;
  return (<><h3>{data.name}</h3><h5>{data.desc}</h5><hr /></>);
}

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    if (!this.props.currentCoursesData && !this.props.completedCoursesData) {
      return (
        <Alert color="danger">
          Failed to load data. Please try again later.
        </Alert>
      )
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
              this.props.completedCoursesData.length !== 0
                ?
                this.props.completedCoursesData.map(item => <Course key={item.id} data={item.data} />)
                :
                'Something went wrong...'
            }
          </TabPane>
          <TabPane tabId="2">
            {
              this.props.currentCoursesData.length !== 0
                ?
                this.props.currentCoursesData.map(item => <Course key={item.id} data={item.data} />)
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