import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

export default class LandingNavBar extends Component {
  render() {
    return (
      <div>
        <Navbar
          className="p-0"
          style={{ backgroundColor: "#FFE500" }}
          expand="lg"
        >
          <div className="row w-100 m-0">
            <div className="col-4">
              <Navbar.Brand href="#home">
                {" "}
                <img
                  src="../../../public/landingLogo.png"
                  width="250"
                  height="44"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
            </div>
            <div className="col-5"></div>
            <div className="col p-0">
              <Button
                className="float-right mt-2 mr-3 ml-2"
                style={{
                  backgroundColor: "#48BDFF",
                  border: 0,
                  color: "#080024",
                }}
              >
                Sign Up
              </Button>
              <Button
                className="float-right mt-2"
                style={{
                  backgroundColor: "#48BDFF",
                  border: 0,
                  color: "#080024",
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}
