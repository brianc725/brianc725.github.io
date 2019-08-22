import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

class NavHeader extends Component {
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
      <Navbar color="light" light fixed="top" expand="md">
        <Link to="/">Brian Chan</Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {/* <NavLink to="/experience/">Experience</NavLink> */}
              <NavLink to="/experience/">Experience</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/projects/">Projects</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Skills
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Languages
                  </DropdownItem>
                <DropdownItem>
                  Frameworks
                  </DropdownItem>
                <DropdownItem>
                  Software Tools
                  </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  All
                  </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink to="/resume/">Resume</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contacts/">Contact Me</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default NavHeader;