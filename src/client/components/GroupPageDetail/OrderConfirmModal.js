import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class OrderConfirmModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please confirm your order</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#48BDFF",
              color: "#080024",
              border: "none",
            }}
            variant="primary"
            onClick={() => {
              this.props.handleClose();
              this.props.handleCreateOrder();
            }}
          >
            Yes
          </Button>
          <Button
            style={{
              backgroundColor: "#FF5522",
              color: "#080024",
              border: "none",
            }}
            variant="secondary"
            onClick={() => {
              this.props.handleClose();
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
