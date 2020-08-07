import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Validator from "validator";
import GlobalAlert from "../Common/GlobalAlert";

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
  handleCloseButton = () => {
    this.setState({...this.state, err: "", showAlert: false});
    this.props.handleClose();
  }
  handleClickAddMember = () => {
    if (this.state.email == "") {
      if (this.state.err != "") {
        return -1;
      }
      this.toggleAlert("Empty fields");
      return -1;
    }
    if (!Validator.isEmail(this.state.email)) {
      this.toggleAlert("Invalid email");
      return -1;
    }
    console.log(this.state.email);
    this.props.handleClose();
    this.setState({ ...this.state, email: "", err: "", showAlert: false });
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.showAlert ? (
            <GlobalAlert alertType={"danger"} message={this.state.err} toggleAlert={this.toggleAlert} />
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
            variant="primary"
            onClick={this.handleClickAddMember}
          >
            Add Member
          </Button>
          <Button
            style={{
              backgroundColor: "#48BDFF",
              color: "#080024",
              border: "none",
            }}
            variant="secondary"
            onClick={() => {
              this.handleCloseButton();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
