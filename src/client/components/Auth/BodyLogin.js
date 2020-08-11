import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Validator from "validator";
import axios from "axios";
import { setUser } from "../../actions/user";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { setAlert, hideAlert } from "../../actions/alert";
import GlobalAlert from "../Common/GlobalAlert";

class BodyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isButtonDisabled: false,
    };
  }
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  handleClick = () => {
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
    axios
      .post(`${process.env.API_URL}/api/auth/signin`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        this.setState({ ...this.state, isButtonDisabled: true }, () => {
          this.props.setUser(res.data.token);
          this.props.history.push("/main", { token: res.data.token });
        });
      })
      .catch((err) =>
        this.setState({ ...this.state, isButtonDisabled: false }, () => {
          this.props.setAlert("danger", err.response.data.message);
        })
      );
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
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="login-form-control"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
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