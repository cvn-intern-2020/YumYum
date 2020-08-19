import React, { Component } from "react";
import { ListGroup, Accordion, Card } from "react-bootstrap";
import OrderDetailList from "./OrderDetailList";

export default class OrderItem extends Component {
  render() {
    const { order } = this.props;
    return (
      <ListGroup.Item className="w-100" style={{ backgroundColor: "white" }}>
        <Accordion defaultActiveKey="0">
          <Card style={{ borderStyle: "none" }}>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <div className="row w-100 m-0">
                <div
                  className="order-list-label col"
                  style={{
                    textAlign: "center",
                    marginLeft: "-1rem",
                  }}
                >
                  {String(order.orderDate).substr(0, 25)}
                </div>
                <div
                  className="order-list-label col"
                  style={{
                    textAlign: "center",
                    marginLeft: "1rem",
                  }}
                >
                  {order.userId.name}
                </div>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <OrderDetailList order={order} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <div className="order-list-label col-6"></div>
      </ListGroup.Item>
    );
  }
}
