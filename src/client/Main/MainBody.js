import React, { Component } from "react";
import GroupCard from "./GroupCard";
export default class MainBody extends Component {
  render() {
    let mock = [1, 2, 3, 4, 5, 6];
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
          {mock.map((mockValue) => (
            <GroupCard key={mockValue}/>
          ))}
      </div>
    );
  }
}
