import React, { Component } from 'react';
import {
  Button,
  Form,
} from 'reactstrap';
import firebase from '../firebase';

class Edit extends Component {
  onSubmit = (event) => {
    firebase.auth().signOut().then(()=> {
        console.log('Successfully logged out');
    }).catch((error) => {
        console.error('Sign out error: ', error);
    });
    event.preventDefault();   
  }

  render() {
    return (
      <Form>
        <Button onClick={this.onSubmit}>Sign Out</Button>
      </Form>
    )
  }
}

export default Edit;