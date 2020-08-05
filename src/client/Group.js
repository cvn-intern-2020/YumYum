import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import GroupBody from "./GroupPageDetail/GroupBody";

export default class Group extends Component {
  render() {
    return (
      <div className="h-100">
        <MainNavBar token={this.props.token} />
        <GroupBody/>
      </div>
    );
  }
}
