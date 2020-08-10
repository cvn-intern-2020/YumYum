import React, { Component } from "react";
import { Container, ListGroup } from "react-bootstrap";
import GroupItem from "./GroupItem";

export default class MyJoinedGroup extends Component {
  render() {
    return (
      <>
        <p className="mt-5 joined-group-text-lable">Joined Group</p>
        <Container fluid className="pr-0 my-joined-own-group-container">
          <ListGroup style={{ backgroundColor: "#C4C4C4" }}>
            {this.props.joinedGroups.map((group) => {
              return (
                <GroupItem
                  name={group.name}
                  description={group.description}
                  groupdId={group._id}
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
