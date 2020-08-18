import React, { Component } from "react";
import LandingNavBar from "../Common/LandingNavBar";
import SignUpBody from "./SignUpBody";

export default class Signup extends Component {
  componentDidMount() {
    const { token, history } = this.props;
    if (token && token != "") {
      history.push("/main");
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
