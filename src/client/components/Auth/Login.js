import React, { Component } from "react";
import BodyLogin from "./BodyLogin";
import LandingNavBar from "../Common/LandingNavBar";

export default class Login extends Component {
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
        <BodyLogin />
      </div>
    );
  }
}
