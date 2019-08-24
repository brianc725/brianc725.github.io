import React, { Component } from 'react';
import {
  Button,
  Form,
} from 'reactstrap';
import fb from '../firebase';

class Edit extends Component {
  onSubmit = (event) => {
    fb.handleSignOut().then(()=> {
        console.log('Successfully logged out');
        this.props.history.push('/');
    }).catch((error) => {
        console.error('Sign out error: ', error);
    });
    event.preventDefault();   
  }

  render() {
    console.log(this.props.location);
    return (
      <Form>
        <Button onClick={this.onSubmit}>Sign Out</Button>
      </Form>
    )
  }
}

export default Edit;