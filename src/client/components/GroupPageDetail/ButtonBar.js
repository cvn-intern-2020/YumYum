import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class ButtonBar extends Component {
  render() {
    return (
      <div className="row w-100 m-0">
        <div className="col-4">
          <Button
            style={{ backgroundColor: "#FF5522", color: "#080024" }}
            className="float-left ml-5 mt-4 group-button"
            onClick={this.props.toggleAddMemberModal}
          >
            Add Member
          </Button>{" "}
        </div>

        <div
          className="mt-4 col-4"
          style={{ fontSize: "40px", textAlign: "center", color: "white" }}
        >
          {this.props.name}
        </div>

        <div className="col-4">
          <Button
            style={{ backgroundColor: "#48BDFF", color: "#080024" }}
            className="float-right mt-4 mr-5 group-button"
            onClick={this.props.toggleEditDishesModal}
          >
            Edit Dishes
          </Button>
        </div>
      </div>
    );
  }
}
