import React, { Component } from 'react';
import { Jumbotron, Alert } from 'reactstrap';

class Home extends Component {
  generateOpener = () => {
    var date = new Date();
    var hour = date.getHours(); //gets hour in 24 hour format

    if (hour >= 18) { //6pm to midnight
      return "Good Evening, I'm Brian!";
    } else if (hour >= 12) { //12pm to 6pm
      return "Good Afternoon, I'm Brian!";
    } else if (hour >= 0) { //midnight to 12pm
      return "Good Morning, I'm Brian!";
    } else { //if the date can't be accessed for whatever reason
      return "Hello, I'm Brian!";
    }
  }

  render() {
    const opener = this.generateOpener();

    return (
      <div>
        <Alert color="warning">
          This site is under active development - please visit my
          {' '}
          <a href="https://brianc725.github.io/Old-Personal-Website/" target="_blank" rel="noopener noreferrer">
            previous static portfolio website
          </a>
          {' '}
          for the most up to date information.
        </Alert>
        <Jumbotron>
          <h1>{opener}</h1>
          <h4>Member of Technical Staff at VMware
          </h4>
          <hr />
          <p>Besides learning how to code, I enjoy photography and traveling.
            I graduated from University of California, Los Angeles (UCLA)
            in March 2020 with a B.S. in Computer Science and Engineering.
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;