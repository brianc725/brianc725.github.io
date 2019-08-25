import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import fb from '../firebase';
import { emailValidator } from '../scripts/validators';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      invalidEmail: '',
      invalidPassword: '',
    };
  }

  onSubmit = async (event) => {
    const { email, password } = this.state;

    // Validators
    if (emailValidator(email.toLowerCase())) {
      fb.handleSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('success');
        this.props.history.push('/admin-edit');
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          this.setState({
            invalidPassword: errorMessage,
          })
        } else if (
          errorCode === 'auth/invalid-email' ||
          errorCode === 'auth/user-disabled' ||
          errorCode === 'auth/user-not-found'
        ) {
          this.setState({
            invalidEmail: errorMessage,
          })
        }
      });
    } else {
      this.setState({
        invalidEmail: 'This does not look like an email address. Please try again.',
      })
    } 
    event.preventDefault();   
  }

  handleChange = (event) => {
    this.setState({
      invalidEmail: '',
      invalidPassword: '',
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="email">Admin Email</Label>
          {
            this.state.invalidEmail !== '' ?
            <Input invalid type="email" name="email" id="email" onChange={this.handleChange} /> :
            <Input type="email" name="email" id="email" onChange={this.handleChange} />
          } 
          {this.state.invalidEmail !== '' && <FormFeedback>{this.state.invalidEmail}</FormFeedback>}   
        </FormGroup>
        <FormGroup>
          <Label for="password">Admin Password</Label>
          {
            this.state.invalidPassword !== '' ?
            <Input invalid type="password" name="password" id="password" onChange={this.handleChange} /> :
            <Input type="password" name="password" id="password" onChange={this.handleChange} />
          } 
          {this.state.invalidPassword !== '' && <FormFeedback>{this.state.invalidPassword}</FormFeedback>}  
        </FormGroup>
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
    )
  }
}

export default Admin;