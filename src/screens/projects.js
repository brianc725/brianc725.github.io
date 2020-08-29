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
  CardSubtitle,
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

    let projItems = this.props.allData.map((item) => {
      const descriptionArray = item.description && item.description.split(':');
      let descriptionTools = '';
      let descriptionText = item.description || '';
      if (descriptionArray && descriptionArray.length === 2) {
        descriptionTools = descriptionArray[0].trim();
        descriptionText = descriptionArray[1].trim();
      }

      return (
        <ListGroupItem key={item.id}>
          <Card>
            {item.name && <CardHeader tag="h3" className="text-center">{item.name}</CardHeader>}
            <CardBody className="text-center">
              {descriptionText && <CardTitle tag="h5">{descriptionText}</CardTitle>}
              {descriptionTools && <CardSubtitle>Utilized: {descriptionTools.substring(1,descriptionTools.length-1)}</CardSubtitle>}
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