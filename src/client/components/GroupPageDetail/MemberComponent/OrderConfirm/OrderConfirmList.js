import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import OrderConfirmItem from "./OrderConfirmItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class DishListUser extends Component {
  render() {
    return (
      <>
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
        <div className="group-container mt-4" style={{ position: "relative" }}>
          <ListGroup>
            {this.props.order.dishes.map((dish) => {
              if (dish.quantity > 0) {
                return <OrderConfirmItem key={dish._id} dish={dish} />;
              }
            })}
          </ListGroup>
          {this.props.order.dishes.length > 0 ? (
            <>
              <ListGroup.Item
                style={{
                  width: "35%",
                  height: "16%",
                  backgroundColor: "white",
                  border: "none",
                }}
                className="float-right dish-label"
              >
                <pre className="dish-label tab4">
                  Total: {this.props.order.totalPrice} VND
                </pre>
              </ListGroup.Item>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order,
  };
}

export default withRouter(connect(mapStateToProps, null)(DishListUser));
