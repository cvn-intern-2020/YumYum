import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Validator from "validator";
import GlobalAlert from "../../Common/GlobalAlert";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../../actions/alert";
import { addMember } from "../../../actions/group";
import { throttle, debounce } from "lodash";
import { createInviteRequest } from "../../../request/invite";
import copy from "copy-to-clipboard";

class AddMemberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleClickAddMember = throttle(this.handleClickAddMember, 5000);
  }
  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  handleCloseButton = () => {
    this.setState(
      {
        ...this.state,
        email: "",
        err: "",
        showAlert: false,
      },
      () => {
        this.handleClickAddMember.cancel();
        this.props.hideAlert();
        this.props.handleClose();
      }
    );
  };
  handleClickAddMember = async () => {
    if (this.state.email == "") {
      if (this.state.err != "") {
        this.props.setAlert("danger", "Email is empty");
        return -1;
      }
      this.props.setAlert("danger", "Email is empty");
      return -1;
    }
    if (!Validator.isEmail(this.state.email)) {
      this.props.setAlert("danger", "Invalid email");
      return -1;
    }
    this.props.addMember(this.props.match.params.groupId, this.state.email);
  };
  componentWillUnmount() {
    this.debouncedEvent.cancel();
    this.handleClickAddMember.cancel();
    if (this.props.showAlert) {
      this.props.hideAlert();
    }
  }
  generateInviteLink = async () => {
    let createInviteResult = await createInviteRequest(this.props.groupId);
    if (!createInviteResult.status) {
      this.props.setAlert("danger", createInviteResult.message);
      return -1;
    }
    copy(`${process.env.FRONT_END_URL}/invite/${createInviteResult.hash}`);
    this.props.setAlert("success", "Invite link copied in clipboard");
  };
  render() {
    const {
      show,
      handleClose,
      showAlert,
      type,
      hideAlert,
      message,
    } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="mr-5">Add New Member</Modal.Title>
          <Button
            style={{
              backgroundColor: "#FF5522",
              color: "#080024",
              border: "none",
            }}
            variant="primary"
            onClick={this.generateInviteLink}
            className="ml-5"
          >
            Create Invite Link
          </Button>
        </Modal.Header>
        <Modal.Body>
          {showAlert ? (
            <GlobalAlert
              alertType={type}
              toggleAlert={hideAlert}
              message={message}
            />
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
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={50}
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

function mapStateToProps(state) {
  return {
    ...state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlert, hideAlert, addMember }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddMemberModal)
);
