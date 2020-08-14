import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default class DishItemAdmin extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">{this.props.dish.dishName}</div>
          <div className="dish-label col">{this.props.dish.dishPrice} VND</div>
        </div>
      </ListGroup.Item>
    );
  }
}
