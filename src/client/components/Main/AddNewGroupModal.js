import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import GlobalAlert from "../Common/GlobalAlert";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import { setUser } from "../../actions/user";
import { createGroupRequest } from "../../request/group";
import { createGroup } from "../../actions/group";
import { debounce } from "lodash";

class AddNewGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
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
  handleSaveNewGroup = async () => {
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
    this.props.createGroup(this.state);
    let createGroupResult = await createGroupRequest(this.state);
    if (!createGroupResult.status) {
      this.props.setAlert("danger", createGroupResult.message);
    } else {
      this.props.setUser(this.props.token);
      this.props.handleClose();
    }
  };
  componentWillUnmount() {
    if (this.props.showAlert) {
      this.props.hideAlert();
    }
    this.debouncedEvent.cancel();
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
                onChange={this.debounceEvent(this.handleChange, 250)}
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
                onChange={this.debounceEvent(this.handleChange, 250)}
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
  return bindActionCreators(
    { setAlert, hideAlert, setUser, createGroup },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddNewGroupModal)
);
