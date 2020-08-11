import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import GlobalAlert from "../Common/GlobalAlert";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../actions/alert";
import { setUser } from "../actions/user";

class AddNewGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCloseButton = () => {
    this.setState({
      ...this.state,
      name: "",
      description: "",
      err: "",
      showAlert: false,
    });
    this.props.hideAlert();
    this.props.handleClose();
  };
  handleSaveNewGroup = () => {
    if (this.state.name == "") {
      if (this.state.err != "") {
        this.props.setAlert("danger", "Group's name is empty");
        return -1;
      }
      this.props.setAlert("danger", "Group's name is empty");
      return -1;
    }
    if (this.state.description == "") {
      if (this.state.err != "") {
        this.props.setAlert("danger", "Group's description is empty");
        return -1;
      }
      this.props.setAlert("danger", "Group's description is empty");
      return -1;
    }
    axios
      .post(
        `${process.env.API_URL}/api/groups/new`,
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
      .then((res) => {
        this.props.setUser(this.props.token);
      })
      .catch((err) => this.props.setAlert("danger", err.response.data.message));

  };
  componentWillUnmount() {
    this.props.hideAlert();
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.showAlert ? (
            <GlobalAlert
              alertType={this.props.type}
              toggleAlert={this.props.hideAlert}
              message={this.props.message}
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

function mapStateToProps(state) {
  return {
    ...state.alert,
    token: state.user.token,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlert, hideAlert, setUser }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddNewGroupModal)
);
