import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Impression extends Component {
  render() {
    return (
      <>
        <div className="h1">THE ONLY FOOD SERVICE YOU CAN'T RESIST</div>
        <p></p>
        <Link to="/login">
          <Button className="landing-button">START ORDERING</Button>{" "}
        </Link>
      </>
    );
  }
}
