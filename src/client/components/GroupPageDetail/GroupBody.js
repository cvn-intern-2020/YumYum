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
import EditDishesModal from "./EditDishesModal";
import { getDishOfUserRequest } from "../../request/dish";
import ButtonBar from "./ButtonBar";
import { createOrderRequest } from "../../request/order";
import convertOderFormat from "../../utils/convertOrderFormat";

class GroupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMemberModal: false,
      showConfirmOrderModal: false,
      showEditDishesModal: false,
      dishes: [], // id price quantity sum
      userDishes: [],
      editedDish: [],
      totalPrice: 0,
    };
  }
  toggleAddMemberModal = () => {
    this.setState({
      ...this.state,
      showAddMemberModal: !this.state.showAddMemberModal,
    });
  };

  toggleEditDishesModal = () => {
    this.setState({
      ...this.state,
      showEditDishesModal: !this.state.showEditDishesModal,
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
      totalDishesCalculate += dish.quantity * dish.dishPrice;
    });
    this.setState({ ...this.state, totalPrice: totalDishesCalculate });
  };

  toggleConfirmOrderModal = () => {
    this.setState({
      ...this.state,
      showConfirmOrderModal: !this.state.showConfirmOrderModal,
    });
  };

  handleCreateOrder = async () => {
    let dishArray = this.state.dishes.filter((dish) => dish.quantity > 0);
    let createOrderResult = await createOrderRequest(
      this.state._id,
      this.props.token,
      dishArray,
      this.state.totalPrice
    );
    if (!createOrderResult.status) {
      this.props.setAlert("danger", createOrderResult.message);
      return -1;
    }
    this.setState({
      ...this.state,
      totalPrice: 0,
      dishes: this.state.dishes.map((dish) => {
        dish.quantity = 0;
        return dish;
      }),
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
      groupData.dishes = convertOderFormat(groupData.dishes);
      this.setState({
        ...this.state,
        ...groupData,
      });
    }
    let getDishOfUserResult = await getDishOfUserRequest(this.props.token);
    if (!getDishOfUserResult.status) {
      console.log(getDishOfUserResult.message);
    } else {
      getDishOfUserResult.dishData = convertOderFormat(
        getDishOfUserResult.dishData
      );
      this.setState({
        userDishes: [...getDishOfUserResult.dishData].reverse(),
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
          handleCreateOrder={this.handleCreateOrder}
          {...this.props}
        />

        <EditDishesModal
          userdish={this.state.userDishes}
          show={this.state.showEditDishesModal}
          dishlist={this.state.dishes}
          handleClose={this.toggleEditDishesModal}
          token={this.props.token}
          {...this.props}
        />

        <ButtonBar
          toggleAddMemberModal={this.toggleAddMemberModal}
          toggleEditDishesModal={this.toggleEditDishesModal}
          name={this.state.name}
        />
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
