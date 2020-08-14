import React, { Component } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import GlobalAlert from "../Common/GlobalAlert";
import OrderItem from "./OrderItem";

export default class OrdersListModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Orders list of your group</Modal.Title>
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
          <div className="text-center-order-list-admin">
            <div className="row w-100 m-0">
              <div
                className=" order-list-label col mt-4"
                style={{ textAlign: "center" }}
              >
                <b>Date</b>
              </div>
              <div
                className="order-list-label col mt-4 ml-2"
                style={{ textAlign: "center" }}
              >
                <b>User</b>
              </div>
            </div>
            <div
              className="group-container mt-4"
              style={{ position: "relative" }}
            >
              <ListGroup style={{ flexDirection: "col", borderRadius: "0" }}>
                {this.props.orders.map((order) => {
                  let date = new Date(order.orderDate);
                  order.orderDate = date;
                  return <OrderItem key={order._id} order={order} />;
                })}
              </ListGroup>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#FF5522",
              color: "#080024",
              border: "none",
            }}
            variant="primary"
            onClick={this.props.handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
