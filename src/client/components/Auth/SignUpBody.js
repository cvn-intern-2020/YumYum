import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Validator from "validator";
import { withRouter } from "react-router-dom";
import GlobalAlert from "../Common/GlobalAlert";
import { setAlert, hideAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signUpRequest } from "../../request/auth";
import { throttle, debounce } from "lodash";
import "../../../../public/signup.css";

class SignUpBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      phone: "",
    };
    this.handleClick = throttle(this.handleClick, 5000);
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
  handleClick = async () => {
    if (this.state.email == "") {
      this.props.setAlert("danger", "Email is empty");
      return -1;
    }
    if (this.state.password == "") {
      this.props.setAlert("danger", "Password is empty");
      return -1;
    }
    if (this.state.name == "") {
      this.props.setAlert("danger", "Name is empty");
      return -1;
    }
    if (this.state.phone == "") {
      this.props.setAlert("danger", "Phone is empty");
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
      this.state.phone.length != 10 ||
      !Validator.isNumeric(this.state.phone)
    ) {
      this.props.setAlert("danger", "Phone number must be 10 number");
      return -1;
    }

    let signUpResult = await signUpRequest(this.state);
    if (!signUpResult.status) {
      this.props.setAlert("danger", signUpResult.message);
    } else {
      this.props.history.push("/login");
    }
  };
  componentWillUnmount() {
    this.debouncedEvent.cancel();
    this.handleClick.cancel();
    if (this.props.showAlert) {
      this.props.hideAlert();
    }
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
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="signup-form-label">
              <b>SIGN UP</b>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              className="signup-form-textbox"
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={20}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              className="signup-form-textbox"
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={50}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              className="signup-form-textbox"
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={20}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Control
              type="text"
              placeholder="Phone"
              name="phone"
              className="signup-form-textbox"
              onChange={this.debounceEvent(this.handleChange, 250)}
            />
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                backgroundColor: "#ff5522",
                color: "#080024",
                width: "50%",
                border: "none",
                marginBottom: "1rem",
              }}
              onClick={this.handleClick}
            >
              <b>SignUp</b>
            </Button>
          </div>

          {this.props.showAlert ? (
            <GlobalAlert
              alertType={this.props.type}
              toggleAlert={this.props.hideAlert}
              message={this.props.message}
            />
          ) : (
            <></>
          )}
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
