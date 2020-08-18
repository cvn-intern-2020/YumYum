import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

export default class OrderItemAdmin extends Component {
  render() {
    const { dish } = this.props;
    return (
      <ListGroup.Item>
        <div className="row w-50 m-0">
          <div className=" dish-label col">{dish.dishName}</div>
          <div className="dish-label col">{dish.dishPrice}</div>
        </div>
      </ListGroup.Item>
    );
  }
}
