import React, { Component } from "react";
import { Modal, Button, ListGroup, ModalBody } from "react-bootstrap";
import EditDishItem from "./EditDishItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import { addEditedDish, deleteEditedDish } from "../../actions/dish";
import GlobalAlert from "../Common/GlobalAlert";

class EditDishesModal extends Component {

  handleUpdateDish = (e) => {
    for (let dish of this.props.editedDishes) {
      if (dish._id == e.target.name) {

        this.props.deleteEditedDish(dish);
        return;
      }
    }
    this.props.addEditedDish(this.props.userDishes.find(dish => dish._id == e.target.name));
  };
  componentWillUnmount() {

    if (this.props.showAlert) {
      this.props.hideAlert();
    }
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#48BDFF", border: "none" }}
        >
          <Modal.Title>Dishes list of your group</Modal.Title>
        </Modal.Header>
        <ModalBody className="p-0">
          {this.props.showAlert ? (
            <GlobalAlert
              alertType={this.props.type}
              toggleAlert={this.props.hideAlert}
              message={this.props.message}
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
              {this.props.userDishes.map((dish) => {
                let checked = false;
                for (let editedDish of this.props.editedDishes) {
                  if (editedDish._id == dish._id) {
                    checked = true;
                    break;
                  }
                }
                return (
                  <EditDishItem
                    show={this.props.showEditDishesModal}
                    key={dish._id}
                    dish={dish}
                    updateEditedDish={this.props.updateEditedDish}
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
            onClick={this.props.handleSaveNewDishes}
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
            onClick={this.props.handleClose}
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
  return bindActionCreators({ setAlert, hideAlert, addEditedDish, deleteEditedDish }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditDishesModal)
);
