import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DishListUser from "./MemberComponent/DishListUser";
import OrderConfirmModal from "./MemberComponent/OrderConfirmModal";
import ButtonBar from "./Common/ButtonBar";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import { setGroup, setOrderToGroup } from "../../actions/group";
import { addToOrder, createOrder } from "../../actions/order";
import GlobalAlert from "../Common/GlobalAlert";
import OrdersListModal from "./Common/OrdersListModal";
import MemberListModal from "./Common/MemberListModal";
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
    const { setOrderToGroup, match } = this.props;
    if (!this.state.showOrdersListModal) {
      setOrderToGroup(match.params.groupId);
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
    const { order, setAlert } = this.props;
    const { showConfirmOrderModal } = this.state;
    if (order.dishes.filter((dish) => dish.quantity > 0).length == 0) {
      setAlert("danger", "You haven't order anything yet");
      return -1;
    }
    this.setState({
      ...this.state,
      showConfirmOrderModal: !showConfirmOrderModal,
    });
  };

  handleCreateOrder = async () => {
    const { createOrder, group } = this.props;
    createOrder(group._id);
  };

  toggleMemberListModal = () => {
    this.setState({
      ...this.state,
      showMemberListModal: !this.state.showMemberListModal,
    });
  };
  componentWillUnmount() {
    const { showAlert, hideAlert } = this.props;
    if (showAlert) {
      hideAlert();
    }
  }
  render() {
    const {
      showConfirmOrderModal,
      showOrdersListModal,
      showMemberListModal,
    } = this.state;
    const { showAlert, type, message, hideAlert } = this.props;
    return (
      <>
        {!showConfirmOrderModal &&
        !showOrdersListModal &&
        !showMemberListModal &&
        showAlert ? (
          <GlobalAlert
            alertType={type}
            message={message}
            toggleAlert={hideAlert}
          />
        ) : (
          <></>
        )}

        <>
          <OrdersListModal
            show={showOrdersListModal}
            handleClose={this.toggleOrdersListModal}
          />
          <OrderConfirmModal
            show={showConfirmOrderModal}
            handleClose={this.toggleConfirmOrderModal}
            handleCreateOrder={this.handleCreateOrder}
          />
          <ButtonBar
            toggleOrdersListModal={this.toggleOrdersListModal}
            toggleMemberListModal={this.toggleMemberListModal}
          />
          <MemberListModal
            show={showMemberListModal}
            handleClose={this.toggleMemberListModal}
          />
          <DishListUser
            show={showMemberListModal}
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
