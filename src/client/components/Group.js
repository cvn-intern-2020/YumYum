import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import GroupBody from "./GroupPageDetail/GroupBody";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearGroup } from "../actions/group";
import "../../../public/group.css";

class Group extends Component {
  componentWillUnmount() {
    this.props.clearGroup();
  }
  render() {
    const { name } = this.props;
    return (
      <div className="h-100">
        <MainNavBar tname={name} />
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
