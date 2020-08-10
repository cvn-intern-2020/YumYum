import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Validator from "validator";
import { withRouter } from "react-router-dom";
import axios from "axios";
import GlobalAlert from "../Common/GlobalAlert";
import { setAlert, hideAlert } from "../actions/alert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class SignUpBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      phone: "",
    };
  }
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  handleClick = () => {
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.name == "" ||
      this.state.phone == ""
    ) {
      this.props.setAlert("danger", "empty field");
      return -1;
    }

    if (!Validator.isEmail(this.state.email)) {
      this.props.setAlert("danger", "Invalid email");
      return -1;
    }
    if (this.state.password.length < 6) {
      this.props.setAlert("danger", "Password must be 6 character at least");
      return -1;
    }
    if (
      this.state.phone.length < 10 ||
      this.state.phone.length > 11 ||
      !Validator.isNumeric(this.state.phone)
    ) {
      this.props.setAlert("danger", "Phone number must be 10 number");
      return -1;
    }
    axios
      .post(`${process.env.API_URL}/api/auth/signup`, {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
      })
      .then(() => this.props.history.push("/login"))
      .catch((err) => {
        this.props.setAlert("danger", err.response.data.message);
      });
  };
  componentWillUnmount() {
    this.props.hideAlert();
  }
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
        <Form className="signup-form">
          {this.props.showAlert ? (
            <GlobalAlert
              alertType={this.props.type}
              toggleAlert={this.props.hideAlert}
              message={this.props.message}
            />
          ) : (
            <></>
          )}
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="signup-form-label">
              <b>SIGN UP</b>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              className="signup-form-textbox"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              className="signup-form-textbox"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              className="signup-form-textbox"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Control
              type="text"
              placeholder="Phone"
              name="phone"
              className="signup-form-textbox"
              onChange={this.handleChange}
            />
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                backgroundColor: "#ff5522",
                color: "#080024",
                width: "50%",
                border: "none",
              }}
              onClick={this.handleClick}
            >
              <b>SignUp</b>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlert, hideAlert }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUpBody)
);
