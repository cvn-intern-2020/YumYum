import React, { Component } from "react";
import Impression from "./Impression";

export default class Body extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
        <div className="landing-div">
          <Impression />
        </div>
      </div>
    );
  }
}
