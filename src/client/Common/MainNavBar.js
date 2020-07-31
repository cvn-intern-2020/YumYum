import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

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
              <Navbar.Brand href="/main">
                <img
                  src="../../../public/yumyum.png"
                  width="250"
                  height="44"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
            </div>
            <div className="col-4"></div>
            <div className="col p-0">
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
              <img
                src="../../../public/mygroup.png"
                width="40"
                height="40"
                alt="React Bootstrap logo"
                className="float-right mt-2 mr-2"
              />
              <Form inline className = "float-right mr-2">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mt-2"
                />
                <Button
                  style={{ backgroundColor: "#48BDFF", color: "#080024" }}
                  className="mt-2"
                >
                  Search
                </Button>
              </Form>
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}
