import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
export default class DishItem extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">{this.props.dish.dishName} </div>
          <div
            style={{ fontSize: "1.6rem" }}
            className="dish-label-quantity col "
          >
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#080024",
                fontSize: "1.6rem",
                paddingTop: 0,
                boxShadow: "none",
              }}
              onClick={() =>
                this.props.changeDishAmount(false, this.props.dish._id)
              }
            >
              [-]
            </Button>
            {this.props.dish.quantity}
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#080024",
                fontSize: "1.6rem",
                paddingTop: 0,
                boxShadow: "none",
              }}
              onClick={() =>
                this.props.changeDishAmount(true, this.props.dish._id)
              }
            >
              [+]
            </Button>
          </div>
          <div className="dish-label col ">{this.props.dish.dishPrice}</div>
          <div className="dish-label col">
            {this.props.dish.quantity * this.props.dish.dishPrice}
          </div>
        </div>
      </ListGroup.Item>
    );
  }
}
