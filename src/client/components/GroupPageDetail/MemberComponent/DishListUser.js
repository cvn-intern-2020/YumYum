import React, { Component } from "react";
import { ListGroup, Button, ListGroupItem } from "react-bootstrap";
import DishItemUser from "./DishItemUser";
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
                <DishItemUser
                  key={dish._id}
                  dish={dish}
                  changeDishAmount={this.props.changeDishAmount}
                />
              );
            })}
          </ListGroup>
          <ListGroupItem
            style={{ width: "35%", height: "16%" }}
            className="float-right dish-label"
          >
            <pre className="dish-label tab4">
              Total: {this.props.totalPrice}
            </pre>
          </ListGroupItem>
          <ListGroupItem style={{ marginTop: "5rem", height: "30%" }}>
            <Button
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                backgroundColor: "#ffe500",
                fontSize: "1.4rem",
                color: "#080024",
                width: "15%",
                borderRadius: "2rem",
              }}
              onClick={this.props.toggleConfirmOrderModal}
            >
              <b>ORDER</b>
            </Button>
          </ListGroupItem>
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
