import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import DishItem from "./DishItem";
import AddMemberModal from "./AddMemberModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getGroupRequest } from "../../request/group";
import DishList from "./DishListUser";
import DishListUser from "./DishListUser";
import OrderConfirmModal from "./OrderConfirmModal";

class GroupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMemberModal: false,
      showConfirmOrderModal: false,
      dishes: [], // id price quantity sum
    };
  }
  toggleAddMemberModal = () => {
    this.setState({
      ...this.state,
      showAddMemberModal: !this.state.showAddMemberModal,
    });
  };

  changeDishAmount = (isIncrementing, dishId) => {
    let newDishState = this.state.dishes.map((dish) => {
      if (dish._id == dishId) {
        if (dish.quantity == 0 && !isIncrementing) {
          return dish;
        }
        dish.quantity = isIncrementing ? dish.quantity + 1 : dish.quantity - 1;
      }
      return dish;
    });
    this.setState({
      ...this.state,
      dishes: [...newDishState],
    });
  };

  toggleConfirmOrderModal = () => {
    this.setState({
      ...this.state,
      showConfirmOrderModal: !this.state.showConfirmOrderModal,
    });
  };

  async componentDidMount() {
    let getGroupResult = await getGroupRequest(
      this.props.match.params.groupId,
      this.props.token
    );
    if (!getGroupResult.status) {
      console.log(getGroupResult.message);
    } else {
      let groupData = getGroupResult.groupData;
      groupData.dishes = groupData.dishes.map((dish) => {
        return { ...dish, quantity: 0 };
      });
      this.setState({
        ...this.state,
        ...groupData,
      });
    }
  }
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
        <AddMemberModal
          show={this.state.showAddMemberModal}
          handleClose={this.toggleAddMemberModal}
          token={this.props.token}
          {...this.props}
        />

        <OrderConfirmModal
          show={this.state.showConfirmOrderModal}
          handleClose={this.toggleConfirmOrderModal}
          {...this.props}
        />
        <div className="row w-100 m-0">
          <div className="col-4">
            <Button
              style={{ backgroundColor: "#FF5522", color: "#080024" }}
              className="float-left ml-5 mt-4 group-button"
              onClick={this.toggleAddMemberModal}
            >
              Add Member
            </Button>{" "}
          </div>

          <div
            className="mt-4 col-4"
            style={{ fontSize: "40px", textAlign: "center", color: "white" }}
          >
            {this.state.name}
          </div>

          <div className="col-4">
            <Button
              style={{ backgroundColor: "#48BDFF", color: "#080024" }}
              className="float-right mt-4 mr-5 group-button"
            >
              Edit Dishes
            </Button>
          </div>
        </div>

        <DishListUser
          changeDishAmount={this.changeDishAmount}
          dishlist={this.state.dishes}
          toggleConfirmOrderModal={this.toggleConfirmOrderModal}
        ></DishListUser>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    _id: state.user._id,
  };
}

export default withRouter(connect(mapStateToProps, null)(GroupBody));
