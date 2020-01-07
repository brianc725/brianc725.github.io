import React, { Component } from 'react';
import {
    ListGroup,
    ListGroupItem,
    Spinner,
    Alert,
    Card,
    CardBody,
    CardSubtitle,
    CardHeader,
  } from 'reactstrap';
import fb from '../firebase';
import { sortPriority } from '../scripts/strings';
import '../App.css';

class Awards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awardsData: undefined,
      error: undefined,
    }
  }

  componentDidMount() {
    fb.awardsRef.get()
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
        this.setState({
          awardsData: sorted,
        });
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        this.setState({
          error: err,
        })
      });
  }

  // Given the data.awarded string in format "F 18, F 19", return list comp.
  // separating them
  separateAwarded = (awarded) => {
    const arr = awarded.split(',');
    const trimmed = arr.map(i => i.trim());
    let items = trimmed.map(item => {
        return (
            <ListGroupItem>{item}</ListGroupItem>
        );
    });
    return (
        <ListGroup flush>{items}</ListGroup>
    );
  }

  render() {
    if (this.state.awardsData === undefined) {
      if (this.state.error) {
        return (
          <Alert color="danger">
            Failed to load data. Please try again later.
          </Alert>
        )
      }
      return (
        <div>
          <Spinner color="primary" className="spinner-center"/>
        </div>
      )
    }

    let awardsItems = this.state.awardsData.map((item) => {
      const { data } = item;
      return (
        <ListGroupItem key={item.id}>
          <Card>
            <CardBody className="text-center">
              {data.name && <CardHeader tag="h3">{data.name}</CardHeader>}
              {data.description && <CardSubtitle style={{ paddingTop: '8px' }}>{data.description}</CardSubtitle>}
              <p style={{paddingTop: '15px'}}>Awarded:</p>
                {data.awarded && this.separateAwarded(data.awarded)}
            </CardBody>
          </Card>
        </ListGroupItem>
      );
    });

    return (
      <ListGroup>
        {awardsItems}
      </ListGroup>
    )
  }
}

export default Awards;