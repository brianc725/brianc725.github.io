import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink} from 'react-router-dom';

class NavFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="light" light fixed="bottom" expand="md">
        <Nav className="ml-auto" navbar>
          {
            this.props.loggedIn
              ?
              <NavItem>
                <NavLink to="/admin-edit/">Edit</NavLink>
              </NavItem>
              :
              <NavItem>
                <NavLink to="/admin/">Admin</NavLink>
              </NavItem>
          }
        </Nav>
      </Navbar>
    )
  }
}

export default NavFooter;