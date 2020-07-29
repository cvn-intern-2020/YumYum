import React, { Component } from "react";
import LandingNavBar from "./Common/LandingNavBar";
import Body from "./Landing/Body";

export default class Landing extends Component {
  render() {
    return <div className="h-100">
        <LandingNavBar/>
        <Body/>
    </div>;
  }
}
