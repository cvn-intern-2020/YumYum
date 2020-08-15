import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import GlobalAlert from "../Common/GlobalAlert";
import { createDishRequest } from "../../request/dish";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import { throttle, debounce } from "lodash";

class AddDishModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
    };
    this.handleClickAddDish = throttle(this.handleClickAddDish, 1000);
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
    this.setState({
      ...this.state,
      name: "",
      price: 0,
    });
    this.props.hideAlert();
    this.props.handleClose();
  };
  handleClickAddDish = async () => {
    if (this.state.name == "") {
      if (this.state.err != "") {
        this.props.setAlert("danger", "Name is empty");
        return -1;
      }
      this.props.setAlert("danger", "Name is empty");
      return -1;
    }
    if (this.state.dishPrice == "") {
      if (this.state.err != "") {
        this.props.setAlert("danger", "Price is empty");
        return -1;
      }
      this.props.setAlert("danger", "Price is empty");
      return -1;
    }
    let createDishResult = await createDishRequest({
      name: this.state.name,
      price: this.state.price * 1000,
    });
    if (!createDishResult.status) {
      this.props.setAlert("danger", createDishResult.message);
    } else {
      this.props.addDishToState(createDishResult.newDish);
    }
    this.setState({
      ...this.state,
      name: "",
      price: 0,
    });
  };
  componentWillUnmount() {
    this.debouncedEvent.cancel();
    this.handleClickAddDish.cancel();
    if (this.props.showAlert) {
      this.props.hideAlert();
    }
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Dish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.showAlert ? (
            <GlobalAlert
              alertType={this.props.type}
              toggleAlert={this.props.hideAlert}
              message={this.props.message}
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
              />
            </Form.Group>

            <Form.Label>Price</Form.Label>
            <Form.Group className="row w">
              <Form.Control
                className="w-25 col ml-3"
                type="number"
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
            onClick={() => {
              this.handleCloseButton();
            }}
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
