import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import Iframe from 'react-iframe'
import fb from '../firebase';

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadUrl: undefined,
      error: undefined,
    }
  }

  loadFile = async () => {
    // Create a reference to the file we want to download
    const resumeRef = fb.storageRef.child('BrianChanResume.pdf');
    let errorStatus = false;
    let dUrl;
    // Get the download URL
    await resumeRef.getDownloadURL().then(url => {
      dUrl = url;
    }).catch(error => {
      console.error(error);
      errorStatus = error.code;
    });

    this.setState({
      downloadUrl: dUrl,
      error: errorStatus,
    });
  }

  render() {
    if (!this.state.downloadUrl && !this.state.error) {
      this.loadFile();
    }

    if (this.state.error) {
      return (
        <Alert color="danger">
          An error has occurred with loading the pdf. Please try again later.
        </Alert>
      )
    }

    return (
      <Iframe url={this.state.downloadUrl}
        width="100%"
        height={window.innerHeight}
        display="initial"
        padding-top="60px"
        position="relative" />
    )
  }
}

export default Resume;