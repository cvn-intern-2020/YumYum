import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToOrder } from "../../../actions/order";
class DishItemUser extends Component {
  render() {
    const { dish, addToOrder, order } = this.props;
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col">{dish.dishName} </div>
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
              onClick={() => addToOrder(dish._id, false)}
            >
              -
            </Button>
            {order.dishes.length == 0 ? (
              <> </>
            ) : (
              order.dishes.find((dish) => dish._id == dish._id).quantity
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
              onClick={() => addToOrder(dish._id, true)}
            >
              +
            </Button>
          </div>
          <div className="dish-label col ">{dish.dishPrice} VND</div>
          <div className="dish-label col">
            {order.dishes.length == 0 ? (
              <> </>
            ) : (
              order.dishes.find((dish) => dish._id == dish._id).quantity *
              dish.dishPrice
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
