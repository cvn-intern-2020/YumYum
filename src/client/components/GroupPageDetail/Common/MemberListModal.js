import React, { Component } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class MemberListModal extends Component {
  render() {
    const { show, handleClose, users } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "rgb(255, 229, 0)" }}>
          <Modal.Title>Members List</Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{ padding: "0.5rem", backgroundColor: "rgb(255, 229, 0)" }}
        >
          <ListGroup className="member-modal" style={{ fontSize: "1.2rem " }}>
            {users.map((user) => (
              <ListGroup.Item key={user.userId}>{user.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgb(255, 229, 0)" }}>
          <Button
            style={{
              backgroundColor: "rgb(255, 85, 34)",
              color: "#080024",
              border: "none",
              fontSize: "1.4rem",
            }}
            variant="secondary"
            onClick={handleClose}
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
    users: state.group.users,
  };
}

export default withRouter(connect(mapStateToProps, null)(MemberListModal));
