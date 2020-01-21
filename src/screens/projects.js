import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Alert,
  Card,
  CardLink,
  CardFooter,
  CardBody,
  CardTitle,
  CardHeader,
} from 'reactstrap';

class Projects extends Component {
  componentDidMount() {
    if (!this.props.allData) {
      return;
    }

    if (this.props.allData.length === 0) {
      this.props.getData();
    }
  }

  render() {
    if (this.props.allData === undefined) {
      return (
        <Alert color="danger">
          Failed to load data. Please try again later.
          </Alert>
      )
    }

    console.log(this.props.allData);

    let projItems = this.props.allData.map((item) => {
      return (
        <ListGroupItem key={item.id}>
          <Card>
            {item.name && <CardHeader tag="h3" className="text-center">{item.name}</CardHeader>}
            <CardBody className="text-center">
              {item.description && <CardTitle tag="h5" style={{ paddingBottom: '0px', marginBottom: '0px' }}>{item.description}</CardTitle>}
            </CardBody>
            <CardFooter className="text-center">
              {item.html_url && <CardLink href={item.html_url} target="_blank" rel="noopener noreferrer">Github Repository</CardLink>}
              {item.homepage && <CardLink href={item.homepage} target="_blank" rel="noopener noreferrer">Project Page</CardLink>}
            </CardFooter>
          </Card>
        </ListGroupItem>
      );
    });

    return (
      <ListGroup>
        {projItems}
      </ListGroup>
    );
  }
}

export default Projects;