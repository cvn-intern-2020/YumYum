import React, { Component } from "react";
import BodyLogin from "./BodyLogin";
import LandingNavBar from "../Common/LandingNavBar";

export default class Login extends Component {
  render() {
    return (
      <div className="h-100">
        <LandingNavBar {...this.props}/>
        <BodyLogin />
      </div>
    );
  }
}
