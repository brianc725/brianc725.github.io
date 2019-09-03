import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Media, Spinner } from 'reactstrap';
import fb from '../firebase';
import '../styles/contactsStyles.css';
import '../App.css';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socialsData: undefined,
    }
  }

  componentDidMount() {
    fb.socialsRef.get()
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
          socialsData: items,
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
    if (this.state.socialsData === undefined) {
      return (
        <div>
          <Spinner color="primary" className="spinner-center"/>
        </div>
      )
    }

    let socialItems = this.state.socialsData.map((item) => {
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