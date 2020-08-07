import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import GlobalAlert from "../Common/GlobalAlert";

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
  handleCloseButton = () => {
    this.setState({ ...this.state, err: "", showAlert: false });
    this.props.handleClose();
  };
  handleSaveNewGroup = () => {
    if (this.state.description == "" || this.state.name == "") {
      if (this.state.err != "") {
        return -1;
      }
      this.toggleAlert("empty field");
      return -1;
    }
    axios
      .post(
        "https://yumyum-hasagi.herokuapp.com/api/groups/new",
        {
          name: this.state.name,
          description: this.state.description,
        },
        {
          headers: {
            Authorization: this.props.token || this.props.location.state.token,
          },
        }
      )
      .then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });

    this.props.handleClose();
    this.setState({
      ...this.state,
      name: "",
      description: "",
      err: "",
      showAlert: false,
    });
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.showAlert ? (
            <GlobalAlert
              alertType={"danger"}
              message={this.state.err}
              toggleAlert={this.toggleAlert}
            />
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
            style={{
              backgroundColor: "#48BDFF",
              color: "#080024",
              border: "none",
            }}
            variant="primary"
            onClick={() => {
              this.handleSaveNewGroup();
            }}
          >
            Save
          </Button>
          <Button
            style={{
              backgroundColor: "#FF5522",
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
