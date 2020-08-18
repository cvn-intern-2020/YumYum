import React, { PureComponent } from "react";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import GroupItem from "./GroupItem";

export default class MyOwnGroup extends PureComponent {
  render() {
    const { toggleAddGroupModal, ownGroups } = this.props;
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <p className="mt-3 my-own-group-text-lable">My Own Group</p>
            </Col>
            <Col></Col>
            <Col>
              <Button
                className="add-new-group-button"
                style={{
                  backgroundColor: "#FFE500",
                  color: "#080024",
                }}
                onClick={toggleAddGroupModal}
              >
                ADD NEW GROUP
              </Button>
            </Col>
          </Row>
        </Container>

        <Container fluid className="pr-0 my-joined-own-group-container">
          <ListGroup className="list-group-container">
            {ownGroups.map((group) => {
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
