import React, { Component } from "react";
import AddMemberModal from "./AdminComponent/AddMemberModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getGroupRequest, editDishesInGroupRequest } from "../../request/group";
import DishListUser from "./MemberComponent/DishListUser";
import OrderConfirmModal from "./OrderConfirmModal";
import EditDishesModal from "./EditDishesModal";
import { getDishOfUserRequest } from "../../request/dish";
import ButtonBar from "./ButtonBar";
import { createOrderRequest } from "../../request/order";
import convertOderFormat from "../../utils/convertOrderFormat";
import DishListAdmin from "./AdminComponent/DishListAdmin";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import GlobalAlert from "../Common/GlobalAlert";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";

class GroupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: "",
      showAddMemberModal: false,
      showConfirmOrderModal: false,
      showEditDishesModal: false,
      dishes: [], // id price quantity sum
      userDishes: [],
      editedDishes: [],
      totalPrice: 0,
    };
  }
  handleSaveNewDishes = async () => {
    let dishArray = this.state.editedDishes.map((dish) => dish._id);
    let editDishesResult = await editDishesInGroupRequest(
      this.state._id,
      dishArray,
      this.props.token
    );
    if (!editDishesResult.status) {
      this.props.setAlert("danger", editDishesResult.message);
      return -1;
    }
    editDishesResult.newDishes = editDishesResult.newDishes.map((dish) => {
      return { ...dish, quantity: 0 };
    });
    editDishesResult.newDishes = convertOderFormat(editDishesResult.newDishes);
    this.setState(
      {
        ...this.state,
        dishes: editDishesResult.newDishes,
      },
      () => {
        this.toggleEditDishesModal();
      }
    );
    this.setState({
      ...this.state,
      err: "",
      showAlert: false,
    });
    this.props.hideAlert();
  };
  toggleAddMemberModal = () => {
    this.setState({
      ...this.state,
      showAddMemberModal: !this.state.showAddMemberModal,
    });
  };
  updateEditedDish = (isAdding, changeDish) => {
    if (isAdding) {
      this.setState({
        ...this.state,
        editedDishes: [changeDish, ...this.state.editedDishes],
      });
    } else {
      this.setState({
        ...this.state,
        editedDishes: this.state.editedDishes.filter(
          (dish) => dish._id != changeDish._id
        ),
      });
    }
  };
  toggleEditDishesModal = async () => {
    if (!this.state.showEditDishesModal) {
      let getDishOfUserResult = await getDishOfUserRequest(this.props.token);
      if (!getDishOfUserResult.status) {
        this.props.setAlert("danger", getDishOfUserResult.message);
        return -1;
      }
      getDishOfUserResult.dishData = convertOderFormat(
        getDishOfUserResult.dishData
      );
      this.setState({
        userDishes: [...getDishOfUserResult.dishData].reverse(),
      });
    }
    this.setState({
      ...this.state,
      showEditDishesModal: !this.state.showEditDishesModal,
      editedDishes: this.state.dishes,
      err: "",
      showAlert: false,
    });
    this.props.hideAlert();
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
      this.props.setAlert("danger", getGroupResult.message);
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
  }
  componentWillUnmount() {
    this.props.hideAlert();
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
        {this.props.showAlert ? (
          <GlobalAlert
            alertType={this.props.type}
            message={this.props.message}
            toggleAlert={this.props.hideAlert}
          />
        ) : (
          <></>
        )}
        {this.state.ownerId == "" ? (
          <></>
        ) : (
          <>
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
            {this.state.userDishes.length > 0 ? (
              <EditDishesModal
                userDishes={this.state.userDishes}
                show={this.state.showEditDishesModal}
                handleClose={this.toggleEditDishesModal}
                token={this.props.token}
                editedDishes={this.state.editedDishes}
                updateEditedDish={this.updateEditedDish}
                handleSaveNewDishes={this.handleSaveNewDishes}
                {...this.props}
              />
            ) : (
              <></>
            )}

            <ButtonBar
              toggleAddMemberModal={this.toggleAddMemberModal}
              name={this.state.name}
              userId={this.props.userId}
              ownerId={this.state.ownerId}
              toggleEditDishesModal={this.toggleEditDishesModal}
            />
            {this.props.userId == this.state.ownerId ? (
              <DishListAdmin dishes={this.state.dishes} />
            ) : (
              <DishListUser
                changeDishAmount={this.changeDishAmount}
                dishes={this.state.dishes}
                toggleConfirmOrderModal={this.toggleConfirmOrderModal}
                totalPrice={this.state.totalPrice}
              ></DishListUser>
            )}
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    userId: state.user._id,
    ...state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlert, hideAlert }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupBody)
);
