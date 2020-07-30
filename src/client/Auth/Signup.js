import React, { Component } from "react";
import SignUpNavBar from "../Signup/SignUpNavBar";
import SignUpBody from "../Signup/SignUpBody";

export default class Signup extends Component {
  render() {
    return (
      <div className="h-100">
        <SignUpNavBar></SignUpNavBar>
        <SignUpBody></SignUpBody>
      </div>
    );
  }
}
