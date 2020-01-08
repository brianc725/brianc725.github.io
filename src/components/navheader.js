import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import fb from '../firebase';

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      // user: undefined,
    });
  }

  // Handles the large view navbar
  // If navbar is large, isOpen is false, so we do not want to toggle
  // However, if it's in mobile then isOpen is true and we do want to toggle
  toggleCond = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  }

  componentDidMount() {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log('user is logged in');
        this.setState({
          user: user,
        });
      } else {
        // console.log('user is not logged in');
        this.setState({
          user: undefined,
        })
      }
    });
  }

  render() {
    return (
      <Navbar color="light" light fixed="top" expand="md">
        <NavbarBrand tag={Link} to="/">Brian Chan</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {/* <NavLink to="/experience/">Experience</NavLink> */}
              <NavLink tag={Link} to="/experience/" onClick={this.toggleCond}>Experience</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/projects/" onClick={this.toggleCond}>Projects</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Education
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink tag={Link} to="/courses/" onClick={this.toggleCond}>Relevant Coursework</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/clubs/" onClick={this.toggleCond}>Extracurriculars</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/awards/" onClick={this.toggleCond}>Awards</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink tag={Link} to="/skills/" onClick={this.toggleCond}>Skills</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/resume/" onClick={this.toggleCond}>Resume</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/contacts/" onClick={this.toggleCond}>Contact Me</NavLink>
            </NavItem>
            {
              fb.isUserLoggedIn() &&
              <NavItem>
                <NavLink tag={Link} to="/admin-edit/" onClick={this.toggleCond}>Edit</NavLink>
              </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default NavHeader;