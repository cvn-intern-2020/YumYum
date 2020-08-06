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
        <div
          className="text-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-4rem",
            marginLeft: "-30rem",
            width: "60rem",
            height: "8rem",
          }}
        >
          <Impression />
        </div>
      </div>
    );
  }
}
