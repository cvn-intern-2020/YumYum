import React, { Component } from "react";
import { Modal, Button, ModalBody } from "react-bootstrap";
import OrderConfirmList from "./OrderConfirm/OrderConfirmList";

export default class OrderConfirmModal extends Component {
  render() {
    const { show, handleClose, handleCreateOrder } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please confirm your order</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <OrderConfirmList />
        </ModalBody>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#48BDFF",
              color: "#080024",
              border: "none",
            }}
            variant="primary"
            onClick={() => {
              handleClose();
              handleCreateOrder();
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
            onClick={handleClose}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
