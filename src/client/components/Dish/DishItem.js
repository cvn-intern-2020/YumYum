import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
export default class DishItem extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
    <div className=" dish-label col">{this.props.dish.name} </div>
          <div className="dish-label col "></div>
          <div className="dish-label col ">{this.props.dish.price}</div>
          <div className="dish-label col"></div>
        </div>
      </ListGroup.Item>
    );
  }
}
