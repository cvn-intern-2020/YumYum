import React, { Component } from "react";
import AddMemberModal from "./AdminComponent/AddMemberModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import EditDishesModal from "./AdminComponent/EditDishesModal";
import ButtonBar from "./Common/ButtonBar";
import DishListAdmin from "./AdminComponent/DishListAdmin";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import GlobalAlert from "../Common/GlobalAlert";
import OrdersListModal from "./Common/OrdersListModal";
import MemberListModal from "./Common/MemberListModal";
import { getDish, updateToEditDish, editDish } from "../../actions/dish";
import { setOrderToGroup } from "../../actions/group";
import { throttle } from "lodash";

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMemberModal: false,
      showEditDishesModal: false,
      showOrdersListModal: false,
      showMemberListModal: false,
    };
    this.handleSaveNewDishes = throttle(this.handleSaveNewDishes, 1000);
  }
  handleSaveNewDishes = async () => {
    this.props.editDish();
    this.toggleEditDishesModal();
  };
  toggleAddMemberModal = () => {
    this.setState({
      ...this.state,
      showAddMemberModal: !this.state.showAddMemberModal,
    });
    this.props.hideAlert();
  };
  toggleEditDishesModal = async () => {
    const { getDish, history, updateToEditDish, hideAlert } = this.props;
    const { showEditDishesModal } = this.state;
    if (!showEditDishesModal) {
      let result = await getDish(history);
      if (!result) {
        history.push({
          pathname: "/dish",
          state: { message: "Please create dish before edit in group" },
        });
        return;
      }
      updateToEditDish();
    }
    this.setState({
      ...this.state,
      showEditDishesModal: !showEditDishesModal,
      err: "",
      showAlert: false,
    });
    hideAlert();
  };

  toggleOrdersListModal = async () => {
    const { setOrderToGroup, match } = this.props;
    const { showOrdersListModal } = this.state;
    if (!showOrdersListModal) {
      setOrderToGroup(match.params.groupId);
      this.setState({
        ...this.state,
        showOrdersListModal: !showOrdersListModal,
      });
      return -1;
    }
    this.setState({
      ...this.state,
      showOrdersListModal: !showOrdersListModal,
    });
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
      showAddMemberModal,
      showEditDishesModal,
      showOrdersListModal,
      showMemberListModal,
    } = this.state;
    const { type, message, hideAlert, group, showAlert } = this.props;
    return (
      <>
        {!showAddMemberModal &&
        !showEditDishesModal &&
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

        <AddMemberModal
          show={showAddMemberModal}
          handleClose={this.toggleAddMemberModal}
          groupId={group._id}
        />
        <OrdersListModal
          show={showOrdersListModal}
          handleClose={this.toggleOrdersListModal}
        />
        <ButtonBar
          toggleAddMemberModal={this.toggleAddMemberModal}
          toggleEditDishesModal={this.toggleEditDishesModal}
          toggleOrdersListModal={this.toggleOrdersListModal}
          toggleMemberListModal={this.toggleMemberListModal}
        />
        <MemberListModal
          show={showMemberListModal}
          handleClose={this.toggleMemberListModal}
        />
        {showEditDishesModal ? (
          <EditDishesModal
            show={showEditDishesModal}
            handleClose={this.toggleEditDishesModal}
            handleSaveNewDishes={this.handleSaveNewDishes}
          />
        ) : (
          <></>
        )}
        <DishListAdmin toggleMemberListModal={this.toggleMemberListModal} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user._id,
    group: state.group,
    ...state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlert,
      hideAlert,
      getDish,
      updateToEditDish,
      editDish,
      setOrderToGroup,
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminView)
);
