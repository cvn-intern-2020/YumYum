import React, { Component } from "react";
import { Container, ListGroup, Row, Col, Image } from "react-bootstrap";

export default class MyJoinedGroup extends Component {
  render() {
    return (
      <>
        <p
          className="mt-5"
          style={{
            backgroundColor: "#FF5522",
            width: "12%",
            fontSize: "2rem",
            borderRadius: "1rem",
            textAlign: "center",
            marginLeft: "1rem",
          }}
        >
          Joined Group
        </p>
        <Container
          fluid
          style={{ maxHeight: "60%", overflowY: "auto", overflowX: "hidden" }}
          className="pr-0"
        >
          <ListGroup style={{ backgroundColor: "#C4C4C4" }}>
            <ListGroup.Item style={{ padding: 0 }}>
              <Row>
                <Col xs={6} md={3} lg={1}>
                  <Image
                    style={{ height: "auto", width: "125%" }}
                    src="../../../public/monan.png"
                  ></Image>
                </Col>
                <Col xs={6} md={9} lg={11}>
                  <div
                    style={{
                      height: "40%",
                      backgroundColor: "#FFE500",
                    }}
                  >
                    {" "}
                    Lunch Group{" "}
                  </div>
                  <div style={{ height: "60%", backgroundColor: "#48BDFF" }}>
                    {" "}
                    Lunch Menu for everybody
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ padding: 0 }}>
              <Row>
                <Col xs={6} md={3} lg={1}>
                  <Image
                    style={{ height: "auto", width: "125%" }}
                    src="../../../public/monan.png"
                  ></Image>
                </Col>
                <Col xs={6} md={9} lg={11}>
                  <div
                    style={{
                      height: "40%",
                      backgroundColor: "#FFE500",
                    }}
                  >
                    {" "}
                    Lunch Group{" "}
                  </div>
                  <div style={{ height: "60%", backgroundColor: "#48BDFF" }}>
                    {" "}
                    Lunch Menu for everybody
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ padding: 0 }}>
              <Row>
                <Col xs={6} md={3} lg={1}>
                  <Image
                    style={{ height: "auto", width: "125%" }}
                    src="../../../public/monan.png"
                  ></Image>
                </Col>
                <Col xs={6} md={9} lg={11}>
                  <div
                    style={{
                      height: "40%",
                      backgroundColor: "#FFE500",
                    }}
                  >
                    {" "}
                    Lunch Group{" "}
                  </div>
                  <div style={{ height: "60%", backgroundColor: "#48BDFF" }}>
                    {" "}
                    Lunch Menu for everybody
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ padding: 0 }}>
              <Row>
                <Col xs={6} md={3} lg={1}>
                  <Image
                    style={{ height: "auto", width: "125%" }}
                    src="../../../public/monan.png"
                  ></Image>
                </Col>
                <Col xs={6} md={9} lg={11}>
                  <div
                    style={{
                      height: "40%",
                      backgroundColor: "#FFE500",
                    }}
                  >
                    {" "}
                    Lunch Group{" "}
                  </div>
                  <div style={{ height: "60%", backgroundColor: "#48BDFF" }}>
                    {" "}
                    Lunch Menu for everybody
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ padding: 0 }}>
              <Row>
                <Col xs={6} md={3} lg={1}>
                  <Image
                    style={{ height: "auto", width: "125%" }}
                    src="../../../public/monan.png"
                  ></Image>
                </Col>
                <Col xs={6} md={9} lg={11}>
                  <div
                    style={{
                      height: "40%",
                      backgroundColor: "#FFE500",
                    }}
                  >
                    {" "}
                    Lunch Group{" "}
                  </div>
                  <div style={{ height: "60%", backgroundColor: "#48BDFF" }}>
                    {" "}
                    Lunch Menu for everybody
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Container>
      </>
    );
  }
}
