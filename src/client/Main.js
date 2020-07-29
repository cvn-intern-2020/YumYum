import React, { Component } from "react";
import MainNavBar from "./Common/MainNavBar";
import MainBody from "./Main/MainBody";


export default class Main extends Component {
  render() {
    return (
      <div className="h-100">
        <MainNavBar></MainNavBar>
        <MainBody>
            
        </MainBody>
        
        
      </div>
    );
  }
}
