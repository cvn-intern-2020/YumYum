import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

export default class NavbarLogin extends Component {
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
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}
