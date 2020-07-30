import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export default class GroupCard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg mt-5">
          <Card style={{ width: "18rem", margin: "0 auto", float: "none", marginBottom: "10px", borderRadius:"25px" }}>
            <Card.Img src="../../../public/banhUot.png" />
            <Card.Body style = {{padding : "0"}}>
                <div style={{backgroundColor:"#FFE500"}}> 
                    <Card.Title style ={{marginBottom:"0", padding:'5px'}}>Group Name</Card.Title>
                </div>
              <Card.Text style={{backgroundColor:"#48BDFF", borderBottomLeftRadius:"25px" , borderBottomRightRadius:"25px", padding: "10px" }}>
                - Description <br></br>
                - Description <br></br>
                - Description
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg mt-5">
          <Card style={{ width: "18rem", margin: "0 auto", float: "none", marginBottom: "10px", borderRadius:"25px" }}>
            <Card.Img src="../../../public/banhUot.png" />
            <Card.Body style = {{padding : "0"}}>
                <div style={{backgroundColor:"#FFE500"}}> 
                    <Card.Title style ={{marginBottom:"0", padding:'5px'}}>Group Name</Card.Title>
                </div>
              <Card.Text style={{backgroundColor:"#48BDFF", borderBottomLeftRadius:"25px" , borderBottomRightRadius:"25px", padding: "10px" }}>
                - Description <br></br>
                - Description <br></br>
                - Description
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg mt-5">
          <Card style={{ width: "18rem", margin: "0 auto", float: "none", marginBottom: "10px", borderRadius:"25px" }}>
            <Card.Img src="../../../public/banhUot.png" />
            <Card.Body style = {{padding : "0"}}>
                <div style={{backgroundColor:"#FFE500"}}> 
                    <Card.Title style ={{marginBottom:"0", padding:'5px'}}>Group Name</Card.Title>
                </div>
              <Card.Text style={{backgroundColor:"#48BDFF", borderBottomLeftRadius:"25px" , borderBottomRightRadius:"25px", padding: "10px" }}>
                - Description <br></br>
                - Description <br></br>
                - Description
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg mt-5">
          <Card style={{ width: "18rem", margin: "0 auto", float: "none", marginBottom: "10px", borderRadius:"25px" }}>
            <Card.Img src="../../../public/banhUot.png" />
            <Card.Body style = {{padding : "0"}}>
                <div style={{backgroundColor:"#FFE500"}}> 
                    <Card.Title style ={{marginBottom:"0", padding:'5px'}}>Group Name</Card.Title>
                </div>
              <Card.Text style={{backgroundColor:"#48BDFF", borderBottomLeftRadius:"25px" , borderBottomRightRadius:"25px", padding: "10px" }}>
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
