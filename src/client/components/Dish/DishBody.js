import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import DishItem from "./DishItems";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import AddDishModal from "./AddDishModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { getDishOfUserRequest, deleteDishRequest } from "../../request/dish";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import GlobalAlert from "../Common/GlobalAlert";

class DishBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmDeleteModal: false,
      showAddDishModal: false,
      dishes: [],
      selected: "",
    };
  }
  toggleAddDishModal = () => {
    this.setState({
      ...this.state,
      showAddDishModal: !this.state.showAddDishModal,
    });
  };

  deleteDish = async () => {
    let deleteDishResult = await deleteDishRequest(
      this.state.selected,
      this.props.token
    );
    if (!deleteDishResult.status) {
      this.props.setAlert("danger", deleteDishResult.message);
      return -1;
    }
    this.setState(
      {
        ...this.state,
        dishes: [
          ...this.state.dishes.filter(
            (dish) => dish._id != this.state.selected
          ),
        ],
        selected: "",
      },
      () => this.toggleConfirmDeleteModal("")
    );
  };
  addDishToState = (dish) => {
    this.setState({ ...this.state, dishes: [dish, ...this.state.dishes] }, () =>
      this.toggleAddDishModal()
    );
  };
  toggleConfirmDeleteModal = (dishId) => {
    this.setState({
      ...this.state,
      showConfirmDeleteModal: !this.state.showConfirmDeleteModal,
      selected: dishId,
    });
  };
  async componentDidMount() {
    if (this.props.location.state) {
      this.props.setAlert("danger", this.props.location.state.message);
    }
    let getDishOfUserResult = await getDishOfUserRequest(this.props.token);
    if (!getDishOfUserResult.status) {
      console.log(getDishOfUserResult.message);
    } else {
      this.setState({ dishes: [...getDishOfUserResult.dishData].reverse() });
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
        {this.props.location.state ? (
          <GlobalAlert
            alertType={this.props.type}
            toggleAlert={this.props.hideAlert}
            message={this.props.message}
          />
        ) : (
          <></>
        )}
        {this.state.selected == "" ? (
          <></>
        ) : (
          <ConfirmDeleteModal
            show={this.state.showConfirmDeleteModal}
            handleClose={this.toggleConfirmDeleteModal}
            deleteDish={this.deleteDish}
            dish={
              this.state.dishes.filter(
                (dish) => dish._id == this.state.selected
              )[0]
            }
            {...this.props}
          />
        )}
        {
          <AddDishModal
            show={this.state.showAddDishModal}
            handleClose={this.toggleAddDishModal}
            addDishToState={this.addDishToState}
            {...this.props}
          />
        }
        <div className="row w-100 m-0">
          <div className="col-4"></div>

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
              onClick={this.toggleAddDishModal}
            >
              Add Dishes
            </Button>{" "}
          </div>
        </div>
        <div className="text-center-group">
          <div className="row w-100 m-0">
            <div
              style={{ textAlign: "left" }}
              className=" dish-label col mt-4 "
            >
              <b>Dishes</b>
            </div>
            <div className="dish-label col mt-4"></div>
            <div className="dish-label col mt-4"></div>
            <div className="dish-label col mt-4"></div>
          </div>
          <div className="dish-container mt-4">
            <ListGroup>
              {this.state.dishes.map((dish) => (
                <DishItem
                  key={dish._id}
                  dish={dish}
                  toggleConfirmDeleteModal={this.toggleConfirmDeleteModal}
                />
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.alert,
    token: state.user.token,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlert, hideAlert }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DishBody)
);
