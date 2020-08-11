import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default class MainNavBar extends Component {
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
              
              <Navbar.Brand>
                <Link to="/main">
                <img
                  src="../../../public/yumyum.png"
                  width="250"
                  height="44"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                </Link>
              </Navbar.Brand>
            </div>
            <div className="col-4"></div>
            <div className="col p-0">
              <Button
                className="float-right mt-2 mr-2"
                style={{
                  backgroundColor: "#ff5522",
                  color: "#080024",
                }}
              >
                <b>Log out</b>
              </Button>
              <img
                src="../../../public/userava.png"
                width="40"
                height="40"
                alt="React Bootstrap logo"
                className="float-right mt-2 mr-2"
              />
              <img
                src="../../../public/noti.png"
                width="40"
                height="40"
                alt="React Bootstrap logo"
                className="float-right mt-2 mr-2"
              />
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}
