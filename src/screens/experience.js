import React, { Component } from 'react';
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
        this.setState({
          experienceData: items,
        })
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        this.setState({
          error: err,
        })
      });
  }


  // HOW TO SORT BY PRIORITY FIELD
  
  // <script>
  // var points = [{id: 1, data: {priority: 5}}, {id: 1, data: {priority: 50}}, {id: 1, data: {priority: 1}}, {id: 1, data: {priority: 8}}, {id: 1, data: {priority: 9}}];
  // document.getElementById("demo").innerHTML = points;
  
  // function myFunction() {
  //   points.sort(function(a, b){return a['data'].priority-b['data'].priority});
  //   document.getElementById("demo").innerHTML = points[0]['data'].priority;
  // }
  // </script>
  
  // </body>
  // </html>
  


  render() {
    // If error, show error screen
    // If experience data is null show loading indicator
    // Othwerise, render the proper data

    // when mapping items, if field is empty string, skip. 

    return (
      <h1>Experience Screen</h1>
    )
  }
}

export default Experience;