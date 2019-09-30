import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Media, Spinner } from 'reactstrap';
import { sortPriority } from '../scripts/strings';
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
        let sorted = sortPriority(items);
        console.log(sorted);
        this.setState({
          experienceData: sorted,
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

    // when mapping items, if field is empty string, skip. 
    if (this.state.experienceData === undefined) {
      return (
        <div>
          <Spinner color="primary" className="spinner-center" />
        </div>
      )
    }

    let experienceItems = this.state.experienceData.map((item) => {
      const { data } = item;
      return (
        <ListGroupItem key={item.id}>
          <h2>{data.name}</h2>
        </ListGroupItem>
      );
    });

    return (
      <ListGroup>
        {experienceItems}
      </ListGroup>
    );
  }
}

export default Experience;