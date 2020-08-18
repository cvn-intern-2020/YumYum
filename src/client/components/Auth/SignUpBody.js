import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import GlobalAlert from "../Common/GlobalAlert";
import { setAlert, hideAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signUpRequest } from "../../request/auth";
import { throttle, debounce } from "lodash";
import "../../../../public/css/signup/signup.css";
import {
  PHONE_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "../../constant";
import { validateSignUp } from "../../utils/validator";

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
    let { email, password, name, phone } = this.state;
    let validateResult = validateSignUp(email, password, name, phone);
    if (!validateResult.status) {
      this.props.setAlert("danger", validateResult.message);
      return -1;
    }
    const signUpResult = await signUpRequest(this.state);
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
    const {showAlert, type, hideAlert, message} = this.props;
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
              maxLength={EMAIL_MAX_LENGTH}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              className="signup-form-textbox"
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={PASSWORD_MAX_LENGTH}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              className="signup-form-textbox"
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={NAME_MAX_LENGTH}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Control
              type="text"
              placeholder="Phone"
              name="phone"
              className="signup-form-textbox"
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={PHONE_MAX_LENGTH}
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

          {showAlert ? (
            <GlobalAlert
              alertType={type}
              toggleAlert={hideAlert}
              message={message}
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
