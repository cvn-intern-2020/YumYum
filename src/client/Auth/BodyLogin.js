import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Validator from "validator";
import axios from "axios";
import { setUser } from "../actions/user";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class BodyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  handleClick = () => {
    if (this.state.email == "" || this.state.password == "") {
      alert("empty fields");
      return -1;
    }
    if (!Validator.isEmail(this.state.email)) {
      alert("not email");
      return -1;
    }
    if (this.state.password.length < 6) {
      alert("not valid pass");
      return -1;
    }

    axios
      .post("http://localhost:3000/api/auth/signin", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          this.props.setUser(res.data.token);
          this.props.history.push("/main", { token: res.data.token });
        }
      });
  };
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
              className="loginpage-loginbutton"
              onClick={this.handleClick}
            >
              <b>Login</b>
            </Button>
            <Link to="/signup">
              <Button className="loginpage-signupbutton">
                <b>SignUp</b>
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(BodyLogin));
