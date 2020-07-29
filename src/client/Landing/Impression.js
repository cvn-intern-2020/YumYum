import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class Impression extends Component {
  render() {
    return (
      <>
      <div className="h1">THE ONLY FOOD SERVICE YOU CAN'T RESIST</div>
      <p></p>
        <Button
          style={{
            backgroundColor: "#48BDFF",
            border: 0,
            color: "#080024",
          }}
        >
          START ORDERING
        </Button>
      </>
    );
  }
}
