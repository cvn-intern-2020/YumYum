import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToOrder } from "../../../actions/order";
class DishItemUser extends Component {
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">{this.props.dish.dishName} </div>
          <div
            style={{ fontSize: "1.6rem" }}
            className="dish-label-quantity col "
          >
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#080024",
                fontSize: "1.6rem",
                paddingTop: 0,
                boxShadow: "none",
              }}
              onClick={() => this.props.addToOrder(this.props.dish._id, false)}
            >
              -
            </Button>
            {this.props.order.dishes.length == 0 ? (
              <> </>
            ) : (
              this.props.order.dishes.find(
                (dish) => dish._id == this.props.dish._id
              ).quantity
            )}
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#080024",
                fontSize: "1.6rem",
                paddingTop: 0,
                boxShadow: "none",
              }}
              onClick={() => this.props.addToOrder(this.props.dish._id, true)}
            >
              +
            </Button>
          </div>
          <div className="dish-label col ">{this.props.dish.dishPrice} VND</div>
          <div className="dish-label col">
            {this.props.order.dishes.length == 0 ? (
              <> </>
            ) : (
              this.props.order.dishes.find(
                (dish) => dish._id == this.props.dish._id
              ).quantity * this.props.dish.dishPrice
            )}
          </div>
        </div>
      </ListGroup.Item>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addToOrder,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    order: state.order,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DishItemUser)
);
