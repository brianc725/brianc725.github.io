import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import fb from '../firebase';
import { nameNoSpace } from '../scripts/strings';

class ResumeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = () => {
        // check to see if there even is a file selected
        if (document.getElementById('file').files.length === 0) {
            alert('Please select PDF file before upload attempt');
            return;
        }

        // select the one and only selected file
        const file = document.getElementById('file').files[0];
        console.log(file);
    }

    render() {
        let newName = "";
        const { item } = this.props;

        // If in adding mode, make newName just 'addition' temporarily
        if (this.props.addition) {
            newName = "addition"
        } else {
            newName = nameNoSpace(item.data['name']);
        }

        // Use the name without spaces for unique key for form id's
        return (
            <div className='upload-resume'>
            <h3>Current file name: </h3>
                <input type='file'
                    id='file'
                    className='input-file'
                    accept='.pdf'
                />
            <Button onClick={this.handleUpdate}>Update</Button>
            </div>
    );
    }
}

export default ResumeForm;