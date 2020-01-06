import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
} from 'reactstrap';
import { sortPriority } from '../scripts/strings';

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experienceData: undefined,
      error: undefined,
    }
  }

  componentDidMount() {
    this.props.fbRef.get()
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
          experienceData: sorted,
        });
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        this.setState({
          error: err,
        })
      });
  }

  render() {
    if (this.state.experienceData === undefined) {
      if (this.state.error) {
        return (
          <Alert color="danger">
            Failed to load data. Please try again later.
          </Alert>
        )
      }
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
          <Card>
            <CardBody className="text-center">
              {data.name && <CardHeader tag="h3">{data.name}</CardHeader>}
              {data.title && <CardTitle tag="h5" style={{ paddingTop: '8px' }}>{data.title}</CardTitle>}
              {data.start_date && data.end_date && <CardSubtitle><em>{data.start_date} - {data.end_date}</em></CardSubtitle>}
              {data.location && <CardSubtitle><small><em>{data.location}</em></small></CardSubtitle>}
              {data.description && <CardText>{data.description}</CardText>}
            </CardBody>
          </Card>
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