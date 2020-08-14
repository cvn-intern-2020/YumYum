import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DishItemAdmin from "./DishItemAdmin";
import OrderListAdmin from "./OrderListAdmin";

class DishListAdmin extends Component {
  render() {
    return (
      <>
        <div className="text-center-group">
          <div className="row w-100 m-0">
            <div className=" dish-label col mt-4">
              <b>User</b>
            </div>
            <div className="dish-label col mt-4">
              <b>Price</b>
            </div>
          </div>
          <div className="group-container mt-4">
            <ListGroup>
              {this.props.dishes.map((dish) => {
                return <DishItemAdmin key={dish._id} dish={dish} />;
              })}
            </ListGroup>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

export default withRouter(connect(mapStateToProps, null)(DishListAdmin));
