import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import GroupBody from "./GroupPageDetail/GroupBody";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearGroup } from "../actions/group";
import "../../../public/css/group/group.css";

class Group extends Component {
  componentWillUnmount() {
    this.props.clearGroup();
  }
  render() {
    return (
      <div className="h-100">
        <MainNavBar token={this.props.token} name={this.props.name} />
        <GroupBody />
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      clearGroup,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Group));
