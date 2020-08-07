import React, { Component } from "react";
import { ListGroup, Row, Col, Image } from "react-bootstrap";

export default class GroupItem extends Component {
  render() {
    return (
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
              {this.props.name}
            </div>
            <div style={{ height: "60%", backgroundColor: "#48BDFF" }}>
              {this.props.description}
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }
}
