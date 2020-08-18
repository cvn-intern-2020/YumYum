import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import OrderConfirmItem from "../MemberComponent/OrderConfirm/OrderConfirmItem";

class OrderDetailList extends Component {
  render() {
    const { order } = this.props;
    return (
      <>
        <div className="row w-100 m-0">
          <div className=" dish-label col mt-4">
            <b>Food Name</b>
          </div>
          <div className="dish-label col mt-4">
            <b>Quantity</b>
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
            {order.details.map((dish) => {
              return <OrderConfirmItem key={dish._id} dish={dish} />;
            })}
          </ListGroup>
          {order.details.length > 0 ? (
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
                  Total: {order.totalPrice} VND
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

export default OrderDetailList;
