import React, { Component } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import GlobalAlert from "../Common/GlobalAlert";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export default class MemberListModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header style={{backgroundColor:"rgb(255, 229, 0)"}}>
          <Modal.Title>Members List</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:"0.5rem", backgroundColor:"rgb(255, 229, 0)"}}>
          <ListGroup className="member-modal"style={{fontSize: "1.2rem "}}>
            <ListGroup.Item >User 1</ListGroup.Item>
            <ListGroup.Item>User 1</ListGroup.Item>
            <ListGroup.Item>User 1</ListGroup.Item>
            <ListGroup.Item>User 1</ListGroup.Item>
            <ListGroup.Item>User 1</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"rgb(255, 229, 0)"}}>
          <Button
            style={{
              backgroundColor: "rgb(255, 85, 34)",
              color: "#080024",
              border: "none",
              fontSize: "1.4rem"
            }}
            variant="secondary"
            onClick={() => {
              this.props.handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer >
      </Modal>
    );
  }
}
