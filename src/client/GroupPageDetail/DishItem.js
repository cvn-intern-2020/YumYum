import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
export default class DishItem extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">Bún</div>
          <div className="dish-label col "></div>
          <div className="dish-label col ">50000</div>
          <div className="dish-label col"></div>
        </div>
      </ListGroup.Item>
    );
  }
}
