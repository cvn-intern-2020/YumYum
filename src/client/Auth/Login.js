import React, { Component } from "react";
import BodyLogin from "../Login/BodyLogin";
import NavbarLogin from "../Login/NavbarLogin";

export default class Login extends Component {
  render() {
    return (
      <div className="h-100">
        <NavbarLogin />
        <BodyLogin />
      </div>
    );
  }
}
