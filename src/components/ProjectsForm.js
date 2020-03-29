import React, { Component } from 'react';
import { Col, Row, Button, Form, Input, } from 'reactstrap';
import fb from '../firebase';
import { stringToArr } from '../scripts/strings';

class ProjectsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsData: undefined,
      project: "",
    };
  }

  async componentDidMount() {
    this.getProjectsData();
  }

  getProjectsData = async () => {
    let projectsData = [];
    await fb.projectsRef.get()
      .then(snapshot => {
        let items = [];
        snapshot.forEach(doc => {
          let item = {
            id: doc.id,
            data: doc.data(),
          }
          items.push(item);
        });
        const { repo_names } = items[0].data;
        projectsData = stringToArr(repo_names);
      }).catch(err => {
        // save error to a state
        console.error('Error getting documents', err);
        projectsData = undefined;
      });

    this.setState({
      projectsData,
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  addProject = async (name) => {
    const { projectsData, project } = this.state;
    const allProjsStr = projectsData.toString() + ',' + project;

    let itemRef = fb.projectsRef.doc('gvLzW1opI0tLlKf6PQua');
    try {
      await itemRef.update({ repo_names: allProjsStr });
      console.log("Successfully updated");
    }
    catch (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    }

    this.setState({
      project: "",
      projectsData: projectsData.concat(stringToArr(project))
    })
  }

  removeProject = async (name) => {
    const remainingData = this.state.projectsData.filter(i => i !== name);
    // update firebase reference with remainingData

    let itemRef = fb.projectsRef.doc('gvLzW1opI0tLlKf6PQua');
    try {
      await itemRef.update({ repo_names: remainingData.toString() });
      console.log("Successfully updated");
    }
    catch (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    }

    this.setState({
      projectsData: remainingData
    });
  }

  render() {
    let projectEditable = this.state.projectsData &&
      this.state.projectsData.map((item, idx) => {
        return (
          <div key={idx}>
            <Row form>
              <Col md={6}><h3>{item}</h3></Col>
              <Col md={6}><Button onClick={() => this.removeProject(item)}>Delete</Button></Col>
            </Row>
          </div>
        );
      })

    return (
      <Form>
        {projectEditable}
        <Row form>
          <Col md={6}><Input type="text" name="project" id="project" placeholder="Add new project" onChange={this.handleChange} value={this.state.project} /></Col>
          <Col md={6}><Button onClick={() => this.addProject()}>Add Project</Button></Col>
        </Row>
      </Form>
    );
  }
}

export default ProjectsForm;