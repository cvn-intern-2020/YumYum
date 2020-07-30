import React, { Component } from "react";
import Impression from "../Landing/Impression";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
export default class BodyLogin extends Component {
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
              style={{
                width: "14rem",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                opacity: "0.8",
                border: "1px solid #000000",
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              style={{
                width: "14rem",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                opacity: "0.8",
                border: "1px solid #000000",
              }}
            />
          </Form.Group>

          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                marginRight: "10px",
                backgroundColor: "#48BDFF",
                color: "#080024",
              }}
              type="submit"
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
