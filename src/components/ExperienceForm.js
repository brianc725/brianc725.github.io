import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import fb from '../firebase';

class ExperienceForm extends Component {


  render() {
    if (this.props.addition) {
      return (
        <h2> New addition form </h2>
      );
    }

    const { item } = this.props;
    // Use the name without spaces for unique key for form id's
    const nameNoSpace = item.data['Name'].replace(/\s/g, '');

    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id={"name" + nameNoSpace} placeholder={item.data['Name']} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input type="text" name="location" id={"location" + nameNoSpace} placeholder={item.data['Location']} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="start_date">Start Date</Label>
              <Input type="text" name="start_date" id={"start_date" + nameNoSpace} placeholder={item.data['Start Date']} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="end_date">End Date</Label>
              <Input type="text" name="end_date" id={"end_date" + nameNoSpace} placeholder={item.data['End Date']} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id={"title" + nameNoSpace} placeholder={item.data['Title']} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="order">Order</Label>
              <Input type="number" name="order" id={"order" + nameNoSpace} placeholder={item.data['Order']} />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id={"description" + nameNoSpace} placeholder={item.data['Description']} />
        </FormGroup>
        <Row>
          <Col sm={6}>
            <Button>Update</Button>
          </Col>
          <Col sm={6}>
            <Button>Delete</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ExperienceForm;