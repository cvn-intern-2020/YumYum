import React, { Component } from "react";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import GroupItem from "./GroupItem";

export default class MyOwnGroup extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <p className="mt-5 my-own-group-text-lable">My Own Group</p>
            </Col>
            <Col></Col>
            <Col>
              <Button
                className="add-new-group-button"
                style={{
                  backgroundColor: "#FFE500",
                  color: "#080024",
                }}
                onClick={this.props.toggleAddGroupModal}
              >
                ADD NEW GROUP
              </Button>
            </Col>
          </Row>
        </Container>

        <Container fluid className="pr-0 my-joined-own-group-container">
          <ListGroup
            style={{
              backgroundColor: "rgba(0,0,0,0.60)",
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {this.props.ownGroups.map((group) => {
              return (
                <GroupItem
                  name={group.name}
                  description={group.description}
                  key={group.groupId}
                  groupId={group.groupId}
                />
              );
            })}
          </ListGroup>
        </Container>
      </>
    );
  }
}
