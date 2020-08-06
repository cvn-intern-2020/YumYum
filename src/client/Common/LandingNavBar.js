import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
              <Navbar.Brand href="/">
                {" "}
                <img
                  src="../../../public/yumyum.png"
                  width="250"
                  height="44"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
            </div>
            <div className="col-5"></div>
            <div className="col p-0">
              {this.props.location.pathname == "/" ? (
                <>
                  <Link to="/signup">
                    <Button
                      className="float-right mt-2 mr-3 ml-2"
                      style={{
                        backgroundColor: "#FF5522",
                        color: "#080024",
                        border: "none",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="float-right mt-2 landing-button">
                      Login
                    </Button>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}
