import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Validator from "validator";
import Alert from "react-bootstrap/Alert";

export default class AddMemberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      err: "",
      email: "",
    };
  }
  toggleAlert = (err) => {
    this.setState({ ...this.state, showAlert: !this.state.showAlert, err });
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  handleClickAddMember = () => {
    if (this.state.email == "") {
      this.toggleAlert("Empty fields");
      return -1;
    }
    if (!Validator.isEmail(this.state.email)) {
      this.toggleAlert("Invalid email");
      return -1;
    }
    console.log(this.state.email);
    this.props.handleClose();
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.showAlert ? (
            <Alert variant={"danger"} onClose={this.toggleAlert} dismissible>
              {this.state.err}
            </Alert>
          ) : (
            <></>
          )}
          <Form.Group>
            <Form.Label>Member Email: </Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              placeholder="abcdxy@example.com"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#FF5522",
              color: "#080024",
              border: "none",
            }}
            variant="secondary"
            onClick={this.props.handleClose}
          >
            Close
          </Button>
          <Button
            className="landing-button"
            variant="primary"
            onClick={this.handleClickAddMember}
          >
            Add Member
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
