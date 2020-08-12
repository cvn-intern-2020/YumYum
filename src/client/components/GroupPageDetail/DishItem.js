import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
export default class DishItem extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">{this.props.dish.name} </div>
          <div style = {{fontSize: "1.6rem"}}className="dish-label-quantity col ">
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#080024",
                fontSize: "1.6rem",
                paddingTop: 0,
                boxShadow: "none"
              }}
            >
              [-]
            </Button>
            1
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#080024",
                fontSize: "1.6rem",
                paddingTop: 0,
                boxShadow: "none"
              }}
            >
              [+]
            </Button>
          </div>
          <div className="dish-label col ">{this.props.dish.price}</div>
          <div className="dish-label col"></div>
        </div>
      </ListGroup.Item>
    );
  }
}
