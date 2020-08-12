import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
export default class DishItem extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">
            Name: Pho <br></br> 30000
          </div>
          <div className="dish-label col "></div>
          <div className="dish-label col "></div>
          <div className="dish-label col">
            <Button
              className="float-right"
              onClick={this.props.toggleConfirmDeleteModal}
            >
              DELETE
            </Button>
          </div>
        </div>
      </ListGroup.Item>
    );
  }
}
