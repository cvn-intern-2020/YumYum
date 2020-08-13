import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import DishItem from "./DishItem";
import AddMemberModal from "./AddMemberModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getGroupRequest, editDishesInGroupRequest } from "../../request/group";
import DishList from "./DishListUser";
import DishListUser from "./DishListUser";
import OrderConfirmModal from "./OrderConfirmModal";
import ButtonBar from "./ButtonBar";

class GroupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMemberModal: false,
      showConfirmOrderModal: false,
      dishes: [], // id price quantity sum
      totalPrice: 0,
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
    this.setState(
      {
        ...this.state,
        dishes: [...newDishState],
      },
      () => this.calculateTotalPrice()
    );
  };

  calculateTotalPrice = () => {
    let totalDishesCalculate = 0;
    this.state.dishes.map((dish) => {
      totalDishesCalculate += dish.quantity * dish.price;
    });
    this.setState({ ...this.state, totalPrice: totalDishesCalculate });
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

        <ButtonBar toggleAddMemberModal={this.toggleAddMemberModal} name={this.state.name}/>

        <DishListUser
          changeDishAmount={this.changeDishAmount}
          dishlist={this.state.dishes}
          toggleConfirmOrderModal={this.toggleConfirmOrderModal}
          totalPrice={this.state.totalPrice}
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
