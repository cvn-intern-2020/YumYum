import React, { Component } from "react";
import { Modal, Button, ListGroup, ModalBody } from "react-bootstrap";
import EditDishItem from "./EditDishItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../../actions/alert";
import { addEditedDish, deleteEditedDish } from "../../../actions/dish";
import GlobalAlert from "../../Common/GlobalAlert";

class EditDishesModal extends Component {
  handleUpdateDish = (e) => {
    const {
      editedDishes,
      userDishes,
      deleteEditedDish,
      addEditedDish,
    } = this.props;
    for (let dish of editedDishes) {
      if (dish._id == e.target.name) {
        deleteEditedDish(dish);
        return;
      }
    }
    addEditedDish(userDishes.find((dish) => dish._id == e.target.name));
  };
  componentWillUnmount() {
    const { showAlert, hideAlert } = this.props;
    if (showAlert) {
      hideAlert();
    }
  }
  render() {
    const {
      show,
      handleClose,
      showAlert,
      type,
      hideAlert,
      message,
      userDishes,
      editedDishes,
      showEditDishesModal,
      updateEditedDish,
      handleSaveNewDishes,
    } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#48BDFF", border: "none" }}
        >
          <Modal.Title>Dishes list of your group</Modal.Title>
        </Modal.Header>
        <ModalBody className="p-0">
          {showAlert ? (
            <GlobalAlert
              alertType={type}
              toggleAlert={hideAlert}
              message={message}
            />
          ) : (
            <></>
          )}
        </ModalBody>
        <div className="edit-dish-list mt-0">
          <div className="row w-100 m-0">
            <div
              style={{ textAlign: "left" }}
              className=" dish-label col-4 mt-4 "
            >
              <b>Food name</b>
            </div>
            <div className="dish-label col-3 mt-4">
              <b>Price</b>
            </div>
          </div>
          <div className=" mt-4">
            <ListGroup>
              {userDishes.map((dish) => {
                let checked = false;
                for (let editedDish of editedDishes) {
                  if (editedDish._id == dish._id) {
                    checked = true;
                    break;
                  }
                }
                return (
                  <EditDishItem
                    show={showEditDishesModal}
                    key={dish._id}
                    dish={dish}
                    updateEditedDish={updateEditedDish}
                    checked={checked}
                    handleSelectChange={this.handleUpdateDish}
                  />
                );
              })}
            </ListGroup>
          </div>
        </div>
        <Modal.Footer style={{ backgroundColor: "#FFE500" }}>
          <Button
            style={{
              backgroundColor: "#28a745",
              color: "#080024",
              border: "none",
            }}
            variant="primary"
            onClick={handleSaveNewDishes}
          >
            Save
          </Button>
          <Button
            style={{
              backgroundColor: "#FF5522",
              color: "#080024",
              border: "none",
            }}
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDishes: state.dish.userDishes,
    editedDishes: state.dish.editedDishes,
    ...state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setAlert, hideAlert, addEditedDish, deleteEditedDish },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditDishesModal)
);
