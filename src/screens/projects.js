import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Alert,
  Badge,
  Card,
  CardLink,
  CardFooter,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Spinner,
} from 'reactstrap';
import { stringToArr } from '../scripts/strings';
import '../App.css';

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
    let { allData } = this.props;

    if (allData === undefined) {
      return (
        <Alert color="danger">
          Failed to load data. Please try again later.
          </Alert>
      )
    }

    if (this.props.allData.length === 0) {
      return <Spinner color="dark" className="spinner_center"/>;
    }

    let projItems = allData.map((item) => {
      const descriptionArray = item.description && item.description.split(':');
      let descriptionTools = '';
      let descriptionText = item.description || '';
      let toolsArray = [];
      if (descriptionArray && descriptionArray.length === 2) {
        descriptionTools = descriptionArray[0].trim();
        descriptionText = descriptionArray[1].trim();

        // Remove square brackets from the string list
        descriptionTools = descriptionTools.substring(1, descriptionTools.length-1);
        toolsArray = stringToArr(descriptionTools);
      }

    let descriptionBadges = toolsArray && toolsArray.map((name) => {
      return (
        <Badge color="primary" key={name} pill className='badge'>
          {name}
        </Badge>
      );
    });

      return (
        <ListGroupItem key={item.id}>
          <Card>
            {item.name && <CardHeader tag="h3" className="text-center">{item.name}</CardHeader>}
            <CardBody className="text-center">
              {descriptionText && <CardTitle tag="h5">{descriptionText}</CardTitle>}
              {descriptionTools && <CardSubtitle>{descriptionBadges}</CardSubtitle>}
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