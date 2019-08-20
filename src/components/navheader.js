import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

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
        <NavbarBrand href="/">Brian Chan</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/experience/">Experience</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/projects/">Projects</NavLink>
            </NavItem>
            { this.state.loggedIn && <NavItem>
              <NavLink href="/projects/">Projects</NavLink>
            </NavItem>}
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
              <NavLink href="/resume/">Resume</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contacts/">Contact Me</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default NavHeader;