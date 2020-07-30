import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export default class GroupCard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg mt-5">
          <Card className = "group-card">
            <Card.Img src="../../../public/banhhoi.png" />
            <Card.Body style = {{padding : "0"}}>
                <div style={{backgroundColor:"#FFE500"}}> 
                    <Card.Title style ={{marginBottom:"0", padding:'5px'}}>Group Name</Card.Title>
                </div>
              <Card.Text className="group-cardtext">
                - Description <br></br>
                - Description <br></br>
                - Description
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg mt-5">
          <Card className = "group-card">
            <Card.Img src="../../../public/banhhoi.png" />
            <Card.Body style = {{padding : "0"}}>
                <div style={{backgroundColor:"#FFE500"}}> 
                    <Card.Title style ={{marginBottom:"0", padding:'5px'}}>Group Name</Card.Title>
                </div>
              <Card.Text className="group-cardtext">
                - Description <br></br>
                - Description <br></br>
                - Description
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg mt-5">
          <Card className = "group-card">
            <Card.Img src="../../../public/banhhoi.png" />
            <Card.Body style = {{padding : "0"}}>
                <div style={{backgroundColor:"#FFE500"}}> 
                    <Card.Title style ={{marginBottom:"0", padding:'5px'}}>Group Name</Card.Title>
                </div>
              <Card.Text className="group-cardtext">
                - Description <br></br>
                - Description <br></br>
                - Description
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg mt-5">
          <Card className = "group-card">
            <Card.Img src="../../../public/banhhoi.png" />
            <Card.Body style = {{padding : "0"}}>
                <div style={{backgroundColor:"#FFE500"}}> 
                    <Card.Title style ={{marginBottom:"0", padding:'5px'}}>Group Name</Card.Title>
                </div>
              <Card.Text className="group-cardtext">
                - Description <br></br>
                - Description <br></br>
                - Description
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
