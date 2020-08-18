import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
export default class DishItem extends Component {
  handleClickDelete = () => {
    this.props.toggleConfirmDeleteModal(this.props.dish._id);
  };
  render() {
    const { dish } = this.props;
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">
            Name:{"  "} {dish.name}
            <br></br>
            Price:{"  "} {dish.price} VND
          </div>

          <div className="dish-label col">
            <Button
              className="float-right"
              onClick={() => {
                this.handleClickDelete();
              }}
            >
              DELETE
            </Button>
          </div>
        </div>
      </ListGroup.Item>
    );
  }
}
