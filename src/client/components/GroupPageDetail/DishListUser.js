import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import DishItem from "./DishItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

 class DishListUser extends Component {
    render() {
    return (
      <div className="text-center">
        <div className="row w-100 m-0">
          <div className=" dish-label col mt-4">
            <b>Food Name</b>
          </div>
          <div className="dish-label col mt-4">
            <b>Amount</b>
          </div>
          <div className="dish-label col mt-4">
            <b>Price</b>
          </div>
          <div className="dish-label col mt-4">
            <b>Sum</b>
          </div>
        </div>
        <div className="group-container mt-4">
          <ListGroup>
            {this.props.dishlist.map((dish) => {
              return <DishItem key={dish._id} dish={dish} />;
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
    return {
      token: state.user.token,
    };
  }
  
  export default withRouter(connect(mapStateToProps, null)(DishListUser));