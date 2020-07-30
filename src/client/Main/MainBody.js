import React, { Component } from "react";
import GroupCard from "./GroupCard";
export default class MainBody extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/backgroundImage.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
          <GroupCard></GroupCard>
      </div>
    );
  }
}
