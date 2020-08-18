import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import GlobalAlert from "../Common/GlobalAlert";
import { createDishRequest } from "../../request/dish";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import { throttle, debounce } from "lodash";
import { DISH_MAX_LENGTH, PRICE_MAX_LENGTH } from "../../constant";
import { validateDish } from "../../utils/validator";

class AddDishModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
    };
    this.handleClickAddDish = throttle(this.handleClickAddDish, 5000);
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  handleCloseButton = () => {
    const { hideAlert, handleClose } = this.props;
    this.setState({
      ...this.state,
      name: "",
      price: 0,
    });
    hideAlert();
    handleClose();
  };
  handleClickAddDish = async () => {
    const { setAlert, addDishToState } = this.props;
    const { name, price } = this.state;
    let validateResult = validateDish(name, price);
    if (!validateResult.status) {
      setAlert("danger", validateResult.message);
      return -1;
    }

    const createDishResult = await createDishRequest({
      name: name,
      price: price * 1000,
    });
    if (!createDishResult.status) {
      setAlert("danger", createDishResult.message);
    } else {
      addDishToState(createDishResult.newDish);
    }
    this.setState({
      ...this.state,
      name: "",
      price: 0,
    });
  };
  componentWillUnmount() {
    const { showAlert, hideAlert } = this.props;
    this.debouncedEvent.cancel();
    this.handleClickAddDish.cancel();
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
    } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Dish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert ? (
            <GlobalAlert
              alertType={type}
              toggleAlert={hideAlert}
              message={message}
            />
          ) : (
            <></>
          )}
          <Form>
            <Form.Group>
              <Form.Label>Name of dish</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter dish name"
                onChange={this.debounceEvent(this.handleChange, 250)}
                maxLength={DISH_MAX_LENGTH}
              />
            </Form.Group>

            <Form.Label>Price</Form.Label>
            <Form.Group className="row w">
              <Form.Control
                className="w-25 col ml-3"
                type="text"
                maxLength={PRICE_MAX_LENGTH}
                placeholder="Enter price "
                name="price"
                onChange={this.debounceEvent(this.handleChange, 250)}
              />
              <div className="input-group-append col">
                <span className="input-group-text" style={{ width: "7rem" }}>
                  x 1000 VND
                </span>
              </div>
              <div className="col"></div>
              <div className="col"></div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#48BDFF",
              color: "#080024",
              border: "none",
            }}
            variant="primary"
            onClick={() => {
              this.handleClickAddDish();
            }}
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
            onClick={this.handleCloseButton}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
  connect(mapStateToProps, mapDispatchToProps)(AddDishModal)
);
