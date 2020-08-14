import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import DishBody from "./Dish/DishBody";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../../public/dish.css";
import "../../../public/group.css";

class Dish extends Component {
  render() {
    return (
      <div className="h-100">
        <MainNavBar token={this.props.token} name={this.props.name} />
        <DishBody {...this.props} />
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

export default withRouter(connect(mapStateToProps, null)(Dish));
