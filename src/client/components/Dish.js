import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import DishBody from "./Dish/DishBody";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Dish extends Component {
  render() {
    return (
      <div className="h-100">
        <MainNavBar token={this.props.token} />
        <DishBody {...this.props} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

export default withRouter(connect(mapStateToProps, null)(Dish));