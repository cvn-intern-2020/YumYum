import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import MainBody from "./Main/MainBody";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../../public/main.css";

class Main extends Component {
  render() {
    return (
      <div className="h-100">
        <MainNavBar name={this.props.name} />
        <MainBody />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
  };
}

export default withRouter(connect(mapStateToProps, null)(Main));
