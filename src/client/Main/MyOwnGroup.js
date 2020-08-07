import React, { Component } from "react";
import { Container, ListGroup, Row, Col, Image, Button } from "react-bootstrap";
import GroupItem from "./GroupItem";


export default class MyOwnGroup extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <p
                className="mt-4"
                style={{
                  backgroundColor: "#48BDFF",
                  width: "40%",
                  fontSize: "2rem",
                  borderRadius: "1rem",
                  textAlign: "center",
                }}
              >
                My Own Group
              </p>
            </Col>
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
                  borderRadius: "0.5rem",
                }}
                onClick={this.props.toggleAddGroupModal}
              >
                ADD NEW GROUP
              </Button>
            </Col>
          </Row>
        </Container>

        <Container
          fluid
          style={{ maxHeight: "60%", overflowY: "auto", overflowX: "hidden" }}
          className="pr-0"
        >
          <ListGroup style={{ backgroundColor: "#C4C4C4" }}>
          {this.props.ownGroups.map((group) => {
              return (
                <GroupItem
                  name={group.name}
                  description={group.description}
                  key={group._id}
                />
              );
            })}
          </ListGroup>
        </Container>
      </>
    );
  }
}
