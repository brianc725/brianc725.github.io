import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Alert,
  Card,
  CardBody,
  CardSubtitle,
  CardHeader,
} from 'reactstrap';
import '../App.css';
import { stringToArr } from '../scripts/strings';

class Awards extends Component {
  componentDidMount() {
    // Do nothing if there was an error
    if (!this.props.awardsData) {
      return;
    }

    // No data yet so call API to update state above
    if (this.props.awardsData.length === 0) {
      // No data yet so load first and then put spinner
      this.props.getData();
    }
  }

  // Given the data.awarded string in format "F 18, F 19", return list comp.
  // separating them
  separateAwarded = (awarded) => {
    const data = stringToArr(awarded);
    let items = data.map(item => {
      return (
        <ListGroupItem key={item}>{item}</ListGroupItem>
      );
    });
    return (
      <ListGroup flush>{items}</ListGroup>
    );
  }

  render() {
    if (!this.props.awardsData) {
      // If undefined at this point, then there was error previously
      return (
        <Alert color="danger">
          Failed to load data. Please try again later.
          </Alert>
      )
    }

    let awardsItems = this.props.awardsData.map((item) => {
      const { data } = item;
      return (
        <ListGroupItem key={item.id}>
          <Card>
            <CardBody className="text-center">
              {data.name && <CardHeader tag="h3">{data.name}</CardHeader>}
              {data.description && <CardSubtitle style={{ paddingTop: '8px' }}>{data.description}</CardSubtitle>}
              <p style={{ paddingTop: '15px' }}>Awarded:</p>
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