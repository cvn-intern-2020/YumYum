import React, { Component } from "react";
import Card from "react-bootstrap/Card";
export default class GroupCard extends Component {
  render() {
    return (
      <Card className="group-card m-5" style={{display: "inline-block"}}>
        <Card.Img src="../../../public/monan.png" />
        <Card.Body style={{ padding: "0" }}>
          <div style={{ backgroundColor: "#FFE500" }}>
            <Card.Title style={{ marginBottom: "0", padding: "5px" }}>
              {this.props.group.name}
            </Card.Title>
          </div>
          <Card.Text className="group-cardtext">
            {this.props.group.description}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
