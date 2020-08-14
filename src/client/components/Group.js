import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import GroupBody from "./GroupPageDetail/GroupBody";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Group extends Component {
  render() {
    return (
      <div className="h-100">
        <MainNavBar token={this.props.token} name={this.props.name} />
        <GroupBody {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    name: state.user.name,
  };
}

export default withRouter(connect(mapStateToProps, null)(Group));
