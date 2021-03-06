import React, { PureComponent } from "react";
import { Container, ListGroup } from "react-bootstrap";
import GroupItem from "./GroupItem";

export default class MyJoinedGroup extends PureComponent {
  render() {
    const { joinedGroups } = this.props;
    return (
      <>
        <p className="mt-5 joined-group-text-lable">Joined Group</p>
        <Container fluid className="pr-0 my-joined-own-group-container">
          <ListGroup className="list-group-container">
            {joinedGroups.map((group) => {
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
