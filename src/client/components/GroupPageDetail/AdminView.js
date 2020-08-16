import React, { Component } from "react";
import AddMemberModal from "./AdminComponent/AddMemberModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import EditDishesModal from "./EditDishesModal";
import ButtonBar from "./ButtonBar";
import DishListAdmin from "./AdminComponent/DishListAdmin";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import GlobalAlert from "../Common/GlobalAlert";
import OrdersListModal from "./OrdersListModal";
import MemberListModal from "./MemberListModal";
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
  };
  toggleEditDishesModal = async () => {
    if (!this.state.showEditDishesModal) {
      let result = await this.props.getDish(this.props.history);
      if (!result) {
        this.props.history.push({
          pathname: "/dish",
          state: { message: "Please create dish before edit in group" },
        });
        return;
      }
      this.props.updateToEditDish();
    }
    this.setState({
      ...this.state,
      showEditDishesModal: !this.state.showEditDishesModal,
      err: "",
      showAlert: false,
    });
    this.props.hideAlert();
  };

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
        <AddMemberModal
          show={this.state.showAddMemberModal}
          handleClose={this.toggleAddMemberModal}
        />
        <OrdersListModal
          show={this.state.showOrdersListModal}
          handleClose={this.toggleOrdersListModal}
        />
        <ButtonBar
          toggleAddMemberModal={this.toggleAddMemberModal}
          toggleEditDishesModal={this.toggleEditDishesModal}
          toggleOrdersListModal={this.toggleOrdersListModal}
          toggleMemberListModal={this.toggleMemberListModal}
        />
        <MemberListModal
          show={this.state.showMemberListModal}
          handleClose={this.toggleMemberListModal}
        />
        {this.state.showEditDishesModal ? (
          <EditDishesModal
            show={this.state.showEditDishesModal}
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
