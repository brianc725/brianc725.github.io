import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Media, Alert } from 'reactstrap';
import '../styles/contactsStyles.css';
import '../App.css';

class Contacts extends Component {
  componentDidMount() {
    if (!this.props.socialsData) {
      return;
    }

    if (this.props.socialsData.length === 0) {
      this.props.getData();
    }
  }

  render() {
    if (!this.props.socialsData) {
        return (
          <Alert color="danger">
            Failed to load data. Please try again later.
          </Alert>
        )
    }

    let socialItems = this.props.socialsData.map((item) => {
      const { data } = item;
      return (
        <ListGroupItem key={item.id}>
          <Media href={data.link ? data.link : '#'} target="_blank" rel="noopener noreferrer" className="media-all">
            {
              item.data.icon &&
              <Media left>
                <Media object src={data.icon} alt={data.name ? data.name : 'company icon'} className="icon-img" />
              </Media>
            }
            <h3 className="icon-name">{data.name}</h3>
          </Media>
        </ListGroupItem>
      );
    });

    return (
      <ListGroup>
        {socialItems}
      </ListGroup>
    )
  }
}

export default Contacts;