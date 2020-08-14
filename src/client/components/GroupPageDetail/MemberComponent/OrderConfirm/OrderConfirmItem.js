import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
export default class OrderConfirmItem extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">{this.props.dish.dishName} </div>
          <div
            style={{ fontSize: "1.6rem" }}
            className="dish-label-quantity col "
          >
            {this.props.dish.quantity}
          </div>
          <div className="dish-label col ">{this.props.dish.dishPrice} VND</div>
          <div className="dish-label col">
            {this.props.dish.quantity * this.props.dish.dishPrice}
          </div>
        </div>
      </ListGroup.Item>
    );
  }
}
