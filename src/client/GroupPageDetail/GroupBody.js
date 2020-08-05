import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import DishItem from "./DishItem";
export default class GroupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [1, 2, 3, 4,5],
    };
  }
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
        <div className="row w-100 m-0">
          <div className="col-6">
            <Button
              style={{ backgroundColor: "#FF5522", color: "#080024" }}
              className="float-left ml-5 mt-4 group-button"
            >
              Add Member
            </Button>{" "}
          </div>
          <div className="col-6">
            <Button
              style={{ backgroundColor: "#48BDFF", color: "#080024" }}
              className="float-right mt-4 mr-5 group-button"
            >
              Add Dishes
            </Button>
          </div>
        </div>
        <div className="text-center">
          <div className="row w-100 m-0">
            <div className=" dish-label col mt-4">
              <b>Food Name</b>
            </div>
            <div className="dish-label col mt-4"></div>
            <div className="dish-label col mt-4">
              <b>Price</b>
            </div>
            <div className="dish-label col mt-4"></div>
          </div>
          <div className="group-container mt-4">
            <ListGroup>
              {this.state.dishes.map((dish) => (
                <DishItem key={dish} />
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
