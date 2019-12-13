import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import fb from '../firebase';

class ResumeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noFile: true,
            success: false,
        };
    }

    checkFile = () => {
        // check to see if there even is a file selected
        if (document.getElementById('file').files.length === 0) {
            this.setState({ noFile: true, });
        }

        this.setState({ noFile: false, success: false, });
    }

    handleSubmit = async () => {
        if (this.state.noFile) {
            return;
        }
        // select the one and only selected file
        const file = document.getElementById('file').files[0];
        const resumeRef = fb.storageRef.child('resume.pdf');
        await resumeRef.put(file).then(function (snapshot) {
            console.log('Uploaded file successfully');
        });
        this.setState({
            success: true,
        });
    }

    render() {
        // Use the name without spaces for unique key for form id's
        return (
            <div className='upload-resume'>
                {this.state.success && <Alert color="success">File upload successful.</Alert>}
                {this.state.noFile && <Alert color="danger">No file currently selected for upload.</Alert>}
                <input type='file'
                    id='file'
                    className='input-file'
                    accept='.pdf'
                    onChange={this.checkFile}
                />
                <Button onClick={this.handleSubmit}>Update</Button>
            </div>
        );
    }
}

export default ResumeForm;