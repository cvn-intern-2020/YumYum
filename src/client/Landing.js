import React, { Component } from "react";
import LandingNavBar from "./components/Common/LandingNavBar";
import Body from "./components/Landing/Body";

export default class Landing extends Component {
  render() {
    return (
      <div className="h-100">
        <LandingNavBar {...this.props} />
        <Body />
      </div>
    );
  }
}
