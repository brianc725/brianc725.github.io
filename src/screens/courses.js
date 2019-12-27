import React, { Component } from 'react';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import classnames from 'classnames';

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

    // TODO: MAKE SURE FOR COURSES ORDER convert to Number first

    render() {
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
                        <h1>Completed Courses</h1>
                    </TabPane>
                    <TabPane tabId="2">
                        <h1>Current Courses</h1>
                        <h2>If there are none then show message instead of empty.</h2>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default Courses;