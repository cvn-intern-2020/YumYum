import React, { Component } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

export default class AddNewGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      showAlert: false,
      err: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleAlert = (err) => {
    this.setState({ ...this.state, showAlert: !this.state.showAlert, err });
  };

  handleSaveNewGroup = () => {
    if (this.state.description == "" || this.state.name == "") {
      this.toggleAlert("empty field");
      return -1;
    }
    axios
      .post("http://localhost:3000/api/groups/new", {
        name: this.state.name,
        description: this.state.description,
      }, {
        headers: {
          Authorization: this.props.token || this.props.location.state.token,
        }
      })
      .then((res, err) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(res);
        }
      });

    this.props.handleClose();
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.showAlert ? (
            <Alert variant={"danger"} dismissible onClose={this.toggleAlert}>
              {this.state.err}
            </Alert>
          ) : (
              <></>
            )}

          <Form>
            <Form.Group>
              <Form.Label>Name of group</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter group name"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                type="text"
                placeholder="Enter description"
                name="description"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              this.handleSaveNewGroup();
            }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              this.props.handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
