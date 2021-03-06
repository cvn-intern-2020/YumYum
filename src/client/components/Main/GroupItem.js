import React, { Component } from "react";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class GroupItem extends Component {
  render() {
    const { groupId, name } = this.props;
    return (
      <ListGroup.Item style={{ padding: 0 }}>
        <Row>
          <Col xs={6} md={3} lg={1}>
            <Image
              style={{ height: "auto", width: "186%" }}
              src="../../../public/monan.png"
            ></Image>
          </Col>
          <Col xs={6} md={9} lg={11} style={{ paddingLeft: "3.3rem" }}>
            <div
              style={{
                height: "100%",
                backgroundColor: "#FFE500",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "#080024",
                  paddingLeft: "0.5rem",
                  fontSize: "2rem",
                  float: "left",
                  position: "relative",
                  marginTop: "1.7rem",
                }}
                to={`/group/${groupId}`}
              >
                <b>{name}</b>
              </Link>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }
}
