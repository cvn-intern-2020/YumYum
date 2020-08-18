import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import DishBody from "./Dish/DishBody";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../../public/dish.css";
import "../../../public/group.css";

class Dish extends Component {
  render() {
    const {userName} = this.props
    return (
      <div className="h-100">
        <MainNavBar name={userName} />
        <DishBody {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    userName: state.user.name,
  };
}

export default withRouter(connect(mapStateToProps, null)(Dish));
