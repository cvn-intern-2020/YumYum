import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import DishBody from "./Dish/DishBody";

export default class Dish extends Component {
  render() {
    return (
      <div className="h-100">
        <MainNavBar token={this.props.token} />
        <DishBody {...this.props} />
      </div>
    );
  }
}
