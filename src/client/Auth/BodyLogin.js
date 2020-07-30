import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Validator from "validator"

export default class BodyLogin extends Component {
  constructor(props){
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
    if (this.state.email == "" || this.state.password == ""){
      alert("WTF");
      return -1;
    }
    if (!Validator.isEmail(this.state.email)){
      alert("not email");
      return -1;
    }
    if (this.state.password.length < 6){
      alert("not valid pass");
      return -1;
    }
  };
  render() { 
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background.png)",
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
            marginLeft: "-10rem",
            width: "20rem",
            height: "16rem",
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
              <b>LOGIN</b>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
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

          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                marginRight: "10px",
                backgroundColor: "#48BDFF",
                color: "#080024",
              }}
              onClick={this.handleClick}
            >
              <b>Login</b>
            </Button>
            <Button
              style={{ backgroundColor: "#48BDFF", color: "#080024" }}
              type="submit"
            >
              <b>SignUp</b>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
