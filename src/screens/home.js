import React, { Component } from 'react';
import { Jumbotron, } from 'reactstrap';

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
        <Jumbotron>
          <h1>{opener}</h1>
          <h4>I am currently a fourth year Computer Science and Engineering
            major at University of California, Los Angeles.
          </h4>
          <hr />
          <p>Besides learning how to code, I enjoy photography and traveling.</p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;