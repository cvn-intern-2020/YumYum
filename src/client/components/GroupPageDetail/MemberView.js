import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DishListUser from "./MemberComponent/DishListUser";
import OrderConfirmModal from "./MemberComponent/OrderConfirmModal";
import ButtonBar from "./ButtonBar";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import { setGroup, setOrderToGroup } from "../../actions/group";
import { addToOrder, createOrder } from "../../actions/order";
import GlobalAlert from "../Common/GlobalAlert";
import OrdersListModal from "./OrdersListModal";
import MemberListModal from "./MemberListModal";
import { getDish } from "../../actions/dish";
import { throttle } from "lodash";

class MemberView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmOrderModal: false,
      showOrdersListModal: false,
      showMemberListModal: false,
    };
    this.handleCreateOrder = throttle(this.handleCreateOrder, 1000);
  }

  toggleOrdersListModal = async () => {
    if (!this.state.showOrdersListModal) {
      this.props.setOrderToGroup(this.props.match.params.groupId);
      this.setState({
        ...this.state,
        showOrdersListModal: !this.state.showOrdersListModal,
      });
      return -1;
    }
    this.setState({
      ...this.state,
      showOrdersListModal: !this.state.showOrdersListModal,
    });
  };

  toggleConfirmOrderModal = () => {
    if (
      this.props.order.dishes.filter((dish) => dish.quantity > 0).length == 0
    ) {
      this.props.setAlert("danger", "You haven't order anything yet");
      return -1;
    }
    this.setState({
      ...this.state,
      showConfirmOrderModal: !this.state.showConfirmOrderModal,
    });
  };

  handleCreateOrder = async () => {
    this.props.createOrder(this.props.group._id);
  };

  toggleMemberListModal = () => {
    this.setState({
      ...this.state,
      showMemberListModal: !this.state.showMemberListModal,
    });
  };
  componentWillUnmount() {
    if (this.props.showAlert) {
      this.props.hideAlert();
    }
  }
  render() {
    return (
      <>
        <GlobalAlert
          alertType={this.props.type}
          message={this.props.message}
          toggleAlert={this.props.hideAlert}
        />
        <>
          <OrdersListModal
            show={this.state.showOrdersListModal}
            handleClose={this.toggleOrdersListModal}
          />
          <OrderConfirmModal
            show={this.state.showConfirmOrderModal}
            dishes={this.state.dishes}
            handleClose={this.toggleConfirmOrderModal}
            handleCreateOrder={this.handleCreateOrder}
            totalPrice={this.state.totalPrice}
          />
          <ButtonBar
            toggleOrdersListModal={this.toggleOrdersListModal}
            toggleMemberListModal={this.toggleMemberListModal}
          />
          <MemberListModal
            show={this.state.showMemberListModal}
            handleClose={this.toggleMemberListModal}
          />
          <DishListUser
            show={this.state.showMemberListModal}
            toggleConfirmOrderModal={this.toggleConfirmOrderModal}
          ></DishListUser>
        </>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user._id,
    group: state.group,
    order: state.order,
    ...state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlert,
      hideAlert,
      setGroup,
      addToOrder,
      createOrder,
      getDish,
      setOrderToGroup,
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MemberView)
);
