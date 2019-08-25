import React, { Component } from 'react';
import fb from '../firebase';

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experienceData: undefined,
      error: undefined,
    }
  }

  componentDidMount() {
    fb.experienceRef.get()
      .then(snapshot => {
        let items = [];
        snapshot.forEach(doc => {
          let item = {
            id: doc.id,
            data: doc.data(),
          }
          items.push(item);
        });
        this.setState({
          experienceData: items,
        })
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        this.setState({
          error: err,
        })
      });
  }

  render() {
    // If error, show error screen
    // If experience data is null show loading indicator
    // Othwerise, render the proper data
    return (
      <h1>Experience Screen</h1>
    )
  }
}

export default Experience;