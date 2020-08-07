import React, { Component } from "react";
import { Container, ListGroup, Row, Col, Image } from "react-bootstrap";
import GroupItem from "./GroupItem";

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
            {this.props.joinedGroups.map((group) => {
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
