import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Validator from "validator";
import { setUser } from "../../actions/user";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { setAlert, hideAlert } from "../../actions/alert";
import GlobalAlert from "../Common/GlobalAlert";
import { signInRequest } from "../../request/auth";
import { throttle, debounce } from "lodash";
import "../../../../public/login.css";

class BodyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isButtonDisabled: false,
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
    if (!Validator.isEmail(this.state.email)) {
      this.props.setAlert("danger", "not email");
      return -1;
    }
    if (this.state.password.length < 6) {
      this.props.setAlert("danger", "not valid pass");
      return -1;
    }

    let signInResult = await signInRequest(this.state);
    if (!signInResult.status) {
      this.setState({ ...this.state, isButtonDisabled: false }, () => {
        this.props.setAlert("danger", signInResult.message);
      });
    } else {
      this.setState({ ...this.state, isButtonDisabled: true }, () => {
        this.props.setUser(signInResult.token);
        this.props.history.push({
          pathname: "/main",
          state: { token: signInResult.token },
        });
      });
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
        <Form className="login-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="login-form-label">
              <b>LOGIN</b>
            </Form.Label>
            <Form.Control
              className="login-form-control"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="login-form-control"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.debounceEvent(this.handleChange, 250)}
              maxLength={50}
            />
          </Form.Group>

          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                marginRight: "10px",
                backgroundColor: "#48bdff",
                color: "#080024",
                border: "none",
                marginBottom: "1rem",
              }}
              disabled={this.state.isButtonDisabled}
              onClick={this.handleClick}
            >
              <b>Login</b>
            </Button>
            <Link to="/signup">
              <Button
                style={{
                  backgroundColor: "#ff5522",
                  color: "#080024",
                  border: "none",
                  marginBottom: "1rem",
                }}
              >
                <b>SignUp</b>
              </Button>
            </Link>
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
  return bindActionCreators({ setUser, setAlert, hideAlert }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BodyLogin)
);
