import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Validator from "validator";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";

export default class SignUpBody extends Component {
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
      alert("empty field");
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
    if (
      this.state.phone.length < 10 ||
      this.state.phone.length > 11 ||
      !Validator.isNumeric(this.state.phone)
    ) {
      alert("not valid phone");
      return -1;
    }
    axios
      .post("https://yumyum-hasagi.herokuapp.com/api/auth/signup", {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
          this.props.history.push("/login");
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
        <Form
          style={{
            backgroundColor: "#FFE500",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-8rem",
            marginLeft: "-8rem",
            width: "20rem",
            height: "25rem",
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "25px",
                marginTop: "2rem",
              }}
            >
              <b>SIGN UP</b>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              style={{
                width: "14rem",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                opacity: "0.8",
                border: "1px solid #000000",
              }}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              style={{
                width: "14rem",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                opacity: "0.8",
                border: "1px solid #000000",
              }}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              style={{
                width: "14rem",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                opacity: "0.8",
                border: "1px solid #000000",
              }}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Control
              type="text"
              placeholder="Phone"
              name="phone"
              style={{
                width: "14rem",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                opacity: "0.8",
                border: "1px solid #000000",
              }}
              onChange={this.handleChange}
            />
          </Form.Group>

          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                backgroundColor: "#48BDFF",
                color: "#080024",
                width: "50%",
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
