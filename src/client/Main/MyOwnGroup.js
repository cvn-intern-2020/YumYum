import React, { Component } from 'react';
import { Container, ListGroup, Row, Col, Image, Button } from "react-bootstrap";

export default class MyOwnGroup extends Component {
    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col>
                            <p className="mt-4" style={{
                                backgroundColor: "#48BDFF",
                                width: "40%",
                                fontSize: "2rem",
                                borderRadius: "1rem",
                                textAlign: "center",
                            }}>My Own Group</p></Col>
                        <Col></Col>
                        <Col>
                            <Button
                                style={{
                                    backgroundColor: "#FFE500",
                                    color: "#080024",
                                    width: "50%",
                                    marginTop: "1.5rem",
                                    marginBottom: "1rem",
                                    float: "right",
                                    fontSize: "1.7rem",
                                    textAlign: "center",
                                    borderRadius: "0.5rem"
                                }}
                                onClick={this.props.toggleAddGroupModal}
                            >
                                ADD NEW GROUP
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <Container fluid style={{ maxHeight: "60%", overflowY: "auto", overflowX: "hidden" }} className="pr-0">
                    <ListGroup style={{ backgroundColor: "#C4C4C4" }}>
                        <ListGroup.Item style={{ padding: 0 }}>
                            <Row>
                                <Col xs={6} md={3} lg={1} >
                                    <Image style={{ height: 'auto', width: '125%' }} src="../../../public/monan.png"></Image>
                                </Col>
                                <Col xs={6} md={9} lg={11}>
                                    <div
                                        style={{
                                            height: "40%",
                                            backgroundColor: "#FFE500"
                                        }}
                                    > Lunch Group </div>
                                    <div
                                        style={{ height: "60%", backgroundColor: "#48BDFF" }}
                                    > Lunch Menu for everybody
                      </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ padding: 0 }}>
                            <Row>
                                <Col xs={6} md={3} lg={1} >
                                    <Image style={{ height: 'auto', width: '125%' }} src="../../../public/monan.png"></Image>
                                </Col>
                                <Col xs={6} md={9} lg={11}>
                                    <div
                                        style={{
                                            height: "40%",
                                            backgroundColor: "#FFE500"
                                        }}
                                    > Lunch Group </div>
                                    <div
                                        style={{ height: "60%", backgroundColor: "#48BDFF" }}
                                    > Lunch Menu for everybody
                      </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ padding: 0 }}>
                            <Row>
                                <Col xs={6} md={3} lg={1} >
                                    <Image style={{ height: 'auto', width: '125%' }} src="../../../public/monan.png"></Image>
                                </Col>
                                <Col xs={6} md={9} lg={11}>
                                    <div
                                        style={{
                                            height: "40%",
                                            backgroundColor: "#FFE500"
                                        }}
                                    > Lunch Group </div>
                                    <div
                                        style={{ height: "60%", backgroundColor: "#48BDFF" }}
                                    > Lunch Menu for everybody
                      </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ padding: 0 }}>
                            <Row>
                                <Col xs={6} md={3} lg={1} >
                                    <Image style={{ height: 'auto', width: '125%' }} src="../../../public/monan.png"></Image>
                                </Col>
                                <Col xs={6} md={9} lg={11}>
                                    <div
                                        style={{
                                            height: "40%",
                                            backgroundColor: "#FFE500"
                                        }}
                                    > Lunch Group </div>
                                    <div
                                        style={{ height: "60%", backgroundColor: "#48BDFF" }}
                                    > Lunch Menu for everybody
                      </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ padding: 0 }}>
                            <Row>
                                <Col xs={6} md={3} lg={1} >
                                    <Image style={{ height: 'auto', width: '125%' }} src="../../../public/monan.png"></Image>
                                </Col>
                                <Col xs={6} md={9} lg={11}>
                                    <div
                                        style={{
                                            height: "40%",
                                            backgroundColor: "#FFE500"
                                        }}
                                    > Lunch Group </div>
                                    <div
                                        style={{ height: "60%", backgroundColor: "#48BDFF" }}
                                    > Lunch Menu for everybody
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
