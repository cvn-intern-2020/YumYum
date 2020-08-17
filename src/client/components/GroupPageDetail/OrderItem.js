import React, { Component } from "react";
import { ListGroup, Accordion, Card } from "react-bootstrap";
import OrderDetailList from "./Common/OrderDetailList";

export default class OrderItem extends Component {
  render() {
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
                  {String(this.props.order.orderDate).substr(0, 25)}
                </div>
                <div
                  className="order-list-label col"
                  style={{
                    textAlign: "center",
                    marginLeft: "1rem",
                  }}
                >
                  {this.props.order.userId.name}
                </div>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <OrderDetailList order={this.props.order} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <div className="order-list-label col-6"></div>
      </ListGroup.Item>
    );
  }
}
