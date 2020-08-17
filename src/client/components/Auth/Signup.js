import React, { Component } from "react";
import LandingNavBar from "../Common/LandingNavBar";
import SignUpBody from "./SignUpBody";

export default class Signup extends Component {
  componentDidMount(){
    if (this.props.token != "") {
      this.props.history.push("/main");
    }
  }
  render() {
    return (
      <div className="h-100">
        <LandingNavBar {...this.props} />
        <SignUpBody {...this.props} />
      </div>
    );
  }
}
