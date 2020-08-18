import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import DishItem from "./DishItems";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AddDishModal from "./AddDishModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { deleteDishRequest } from "../../request/dish";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import GlobalAlert from "../Common/GlobalAlert";
import { throttle } from "lodash";
import { getDish } from "../../actions/dish";

class DishBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmDeleteModal: false,
      showAddDishModal: false,
      dishes: [],
      selected: "",
    };
    this.deleteDish = throttle(this.deleteDish, 1000);
  }
  toggleAddDishModal = () => {
    this.setState({
      ...this.state,
      showAddDishModal: !this.state.showAddDishModal,
    });
  };

  deleteDish = async () => {
    const { setAlert } = this.props;
    const { selected } = this.state;
    const deleteDishResult = await deleteDishRequest(selected);
    if (!deleteDishResult.status) {
      setAlert("danger", deleteDishResult.message);
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
    this.props.getDish();
    if (this.props.location.state) {
      this.props.setAlert("danger", this.props.location.state.message);
    }
    const { getDishOfUserRequest } = await import("../../request/dish");
    const getDishOfUserResult = await getDishOfUserRequest();
    if (!getDishOfUserResult.status) {
      this.props.setAlert(
        "danger",
        "Something went wrong please refresh the page"
      );
    } else {
      this.setState({ dishes: [...getDishOfUserResult.dishData].reverse() });
    }
  }
  render() {
    const { type, hideAlert, message } = this.props;
    const {
      showConfirmDeleteModal,
      dishes,
      selected,
      showAddDishModal,
      name,
    } = this.state;
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
            alertType={type}
            toggleAlert={hideAlert}
            message={message}
          />
        ) : (
          <></>
        )}
        {this.state.selected == "" ? (
          <></>
        ) : (
          <ConfirmDeleteModal
            show={showConfirmDeleteModal}
            handleClose={this.toggleConfirmDeleteModal}
            deleteDish={this.deleteDish}
            dish={dishes.filter((dish) => dish._id == selected)[0]}
            {...this.props}
          />
        )}
        {
          <AddDishModal
            show={showAddDishModal}
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
            {name}
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
              {dishes.map((dish) => (
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
  return bindActionCreators({ setAlert, hideAlert, getDish }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DishBody)
);
