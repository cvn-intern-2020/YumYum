import React, { Component } from "react";
import axios from "axios";
import { Container, ListGroup, Row, Col, Image } from "react-bootstrap";

export default class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }
  // componentDidMount() {
  //   axios
  //     .get("https://yumyum-hasagi.herokuapp.com/api/groups/", {
  //       headers: {
  //         Authorization: this.props.token || this.props.location.state.token,
  //       },
  //     })
  //     .then((res, err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         this.setState({ groups: res.data });
  //       }
  //     });
  // }
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
        <Container className="ml-2" style={{ position: "absolute", height: "40%" }} fluid>
          <p className="mt-5" style={{
            backgroundColor: "#FF5522",
            width: "12%",
            fontSize: "2rem",
            borderRadius: "1rem",
            textAlign: "center",
            marginLeft: "1rem"
          }}>Joined Group</p>
          <Container fluid style={{ maxHeight: "60%", overflowY: "auto", overflowX: "hidden" }} className="pr-0">
            <ListGroup>
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

          {/*----------------------------------------------------- My Own Group --------------------------------------------------------*/}
          <p className="mt-5" style={{
            backgroundColor: "#48BDFF",
            width: "12%",
            fontSize: "2rem",
            borderRadius: "1rem",
            textAlign: "center",
            marginLeft: "1rem"
          }}>My Own Group</p>
          <Container fluid style={{ maxHeight: "60%", overflowY: "auto", overflowX: "hidden" }} className="pr-0">
            <ListGroup>
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
        </Container>



        {/* {this.state.groups.map((group) =
 
        ))} */}

      </div >
    );
  }
}
