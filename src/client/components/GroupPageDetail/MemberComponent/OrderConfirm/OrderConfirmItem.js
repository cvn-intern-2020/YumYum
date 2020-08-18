import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
export default class OrderConfirmItem extends Component {
  render() {
    const { dish } = this.props;
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">{dish.dishName} </div>
          <div
            style={{ fontSize: "1.6rem" }}
            className="dish-label-quantity col "
          >
            {dish.quantity}
          </div>
          <div className="dish-label col ">{dish.dishPrice} VND</div>
          <div className="dish-label col">{dish.quantity * dish.dishPrice}</div>
        </div>
      </ListGroup.Item>
    );
  }
}
