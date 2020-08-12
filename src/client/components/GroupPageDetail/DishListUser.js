import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
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
              return (
                <DishItem
                  key={dish._id}
                  dish={dish}
                  changeDishAmount={this.props.changeDishAmount}
                />
              );
            })}
          </ListGroup>
        </div>
        <Button
          style={{
            position: "absolute",
            right: "0",
            bottom: "0",
            marginLeft: "1rem",
            backgroundColor: "#48BDFF",
            fontSize: "1.4rem",
            color: "#080024",
          }}
          onClick={this.props.toggleConfirmOrderModal}
        >
          <b>ORDER</b>
        </Button>
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
