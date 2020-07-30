import React, { Component } from "react";
import GroupCard from "./GroupCard";
import axios from "axios";
export default class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }
  componentDidMount() {
    axios.get("http://localhost:3000/api/groups/").then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ groups: res.data });
      }
    });
  }
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
        {this.state.groups.map((group) => (
          <GroupCard key={group._id} group = {group} />
        ))}
      </div>
    );
  }
}
